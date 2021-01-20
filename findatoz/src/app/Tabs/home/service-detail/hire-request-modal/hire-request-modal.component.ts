import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalController} from '@ionic/angular';
import { RequestModel } from 'src/app/Models/RequestModel';
import { UsersModel } from 'src/app/Models/Users.model';
import { Dataservice } from 'src/app/Services/dataservice.service';
import { Globalservice } from 'src/app/Services/global.service';
import { HttpClient } from '@angular/common/http';
import { AppointmentBookedModalComponent } from 'src/app/Modals/appointment-booked-modal/appointment-booked-modal.component';

@Component({
  selector: 'app-hire-request-modal',
  templateUrl: './hire-request-modal.component.html',
  styleUrls: ['./hire-request-modal.component.scss'],
})
export class HireRequestModalComponent implements OnInit {
  @Input() providerid:string;

  
  minDate = new Date().toISOString(); 
  maxDate: any = new Date(new Date().setFullYear(new Date().getFullYear() + 2)).toISOString();
  countriesList:any;
  countries:any;
  selectedCountry:string;

  stateList:any;
  states:any;
  selectedState:string;

  cityList:any;
  cities:any;
  selectedCity:string='';
  
  currentuser:UsersModel;

  constructor( public modalController: ModalController,
            public dataserv:Dataservice,
            public globalserv:Globalservice,
            private httpClient: HttpClient) { }

  ngOnInit() {
  
    this.globalserv.currentUser.subscribe(data=>{
      this.currentuser=data;
    })
    this.httpClient.get("assets/json/countrieslist.json").subscribe(data =>{
      this.countriesList=data;
      this.countries=this.countriesList.countries;
    });
    this.httpClient.get("assets/json/stateslist.json").subscribe(data =>{
      this.stateList=data;
    });
    this.httpClient.get("assets/json/citieslist.json").subscribe(data =>{
      this.cityList=data;
    })
  
  }

  hireRequest = new FormGroup({
    startdate:new FormControl('',Validators.required),
    starttime: new  FormControl('',[Validators.required]),
    endtime: new  FormControl('',[Validators.required]),
    message: new  FormControl(''),
});


onSubmit(){

  const requestdata=new RequestModel(this.currentuser.email,
    this.providerid,
    this.hireRequest.get('startdate').value,
    this.hireRequest.get('starttime').value,
    this.hireRequest.get('endtime').value,this.selectedState,this.selectedCity,this.hireRequest.get('message').value,'Pending');
   
  this.dataserv.saveRequest(requestdata).subscribe(data=>{
    this.modalController.dismiss();
    this.appointmentBooked();
  });
    
  }
  onSelectCountry(selectedValue: any) {
    this.selectedCountry=selectedValue.detail.value.name;
    this.states=this.stateList.states.filter(function(i){
      return i.country_id==selectedValue.detail.value.id;
    });
    
  }

  onSelectState(selectedValue: any) {
    this.selectedState=selectedValue.detail.value.name;
    this.cities=this.cityList.cities.filter(function(i){
      return i.state_id==selectedValue.detail.value.id;
    });
    
  }

  onSelectCity(selectedValue: any) {
    this.selectedCity=selectedValue.detail.value.name;
    
  }

  onClose(){
    this.modalController.dismiss(); 
  }

  async appointmentBooked() {
    const requestdata=new RequestModel(null,
      null,this.hireRequest.get('startdate').value,
      this.hireRequest.get('starttime').value,
      this.hireRequest.get('endtime').value,null,null,null,null);
      
    const modal = await this.modalController.create({
      component: AppointmentBookedModalComponent,
      cssClass: 'appointmentSuccessMessage',
      componentProps: {
        appointmentDate:requestdata,
        },
    });
    return await modal.present();
  }
}
