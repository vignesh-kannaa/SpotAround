import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-filter-modal',
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.scss'],
})
export class FilterModalComponent implements OnInit {

  constructor(public modalController: ModalController,
    private httpClient: HttpClient) { }

  countriesList:any;
  countries:any;
  selectedCountry:string;

  stateList:any;
  states:any;
  selectedState:string;

  cityList:any;
  cities:any;
  selectedCity:string='';
  
  ngOnInit() {
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
  onSubmit(){
    this.modalController.dismiss(this.selectedCity);
}
  onReset(){
  this.modalController.dismiss('reset'); 
}
  onClose(){
    this.modalController.dismiss(''); 
  }
}
