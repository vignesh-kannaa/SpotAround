import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import {Plugins, Capacitor, CameraSource, CameraResultType} from '@capacitor/core'
import { ModalController } from '@ionic/angular';
import { CropmodalComponent } from './cropmodal/cropmodal.component';
import { Router } from '@angular/router';
import { Globalservice } from 'src/app/Services/global.service';
import { UsersModel } from 'src/app/Models/Users.model';
import { Dataservice } from 'src/app/Services/dataservice.service';
import { ProvidersModel } from 'src/app/Models/providers.model';
import { ProvidersSkillsModel } from 'src/app/Models/providersSkill.model';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {


  businessFlag:string;
  bstatus:boolean;
  defaultimageUser:string='assets/avatar.svg';
  defaultimageProvider:string='assets/avatar.svg';
  skills=new FormArray([]);
  currentUser:UsersModel;
  currentProvider:ProvidersModel;
  editProfile:FormGroup;
  editProfile1:FormGroup;
  skillFlag:boolean=true;
  addFlag:boolean=true;
  
  categoryList=[];
  subCategoryList=[];
  category:string='';
  subCategrory:string='';
  providerFirstName:string='';
  providerLastName:string='';
  providerDescription:string='';
  providerRatings:number=0;
  providerHiredTimes:number=0;
  providerskillsArray:ProvidersSkillsModel[];
  countriesList:any;
  countries:any;
  selectedCountry:string;

  stateList:any;
  states:any;
  selectedState:string;

  cityList:any;
  cities:any;
  selectedCity:string='';
  


  constructor(
    private modalController:ModalController,
    private router:Router,
    private globalserv:Globalservice,
    private dataservice:Dataservice,
    private httpClient: HttpClient ) { }

  ngOnInit() { 
  
    this.globalserv.currentUser.subscribe(data=>{
      this.currentUser=data;
      if(this.currentUser.profilePath!=null){
        this.defaultimageUser=this.currentUser.profilePath;
      }
    }); 
      this.globalserv.bstatus.subscribe(data=>{
        this.bstatus=data;
     });

   this.dataservice.getCategory().subscribe(data=>{
     this.categoryList=data;
   });
   this.httpClient.get("assets/json/countrieslist.json").subscribe(data =>{
    this.countriesList=data;
    this.countries=this.countriesList.countries;
  });
  this.httpClient.get("assets/json/stateslist.json").subscribe(data =>{
    this.stateList=data;
  });
  this.httpClient.get("assets/json/citieslist.json").subscribe(data =>{
    this.cityList=data;
  });

  //to load data if already saved

   this.globalserv.currentProvider.subscribe(data=>{
     this.currentProvider=data;
     if(this.currentProvider!==null){
       console.log("in the current provider condition:")
      if(this.currentProvider?.imagePath){
          this.defaultimageProvider=this.currentProvider.imagePath;
      }
        this.selectedState=this.currentProvider.state;
        this.category=this.currentProvider.category;
        this.providerFirstName=this.currentProvider.firstName;
        this.providerLastName=this.currentProvider.lastName;
        this.providerDescription=this.currentProvider.description;
        this.providerRatings=this.currentProvider.ratings;
        this.providerHiredTimes=this.currentProvider.hiredTimes;
      }
   });
   if(this.currentProvider!=null){
      this.dataservice.getSubCategory(this.category).subscribe(data=>{
        this.subCategoryList=data;
    });
     this.dataservice.getSkills(this.currentProvider.email).subscribe(data=>{
       this.skillFlag=false;
       this.addFlag=false;
      this.providerskillsArray=data;
      for(let skill of this.providerskillsArray){
       this.skills.push(
          new FormGroup({
            'skill':new FormControl(skill.skills),
          })
        )
      }
    });

    this.selectedCity=this.currentProvider.city;
    this.subCategrory=this.currentProvider.subCategory;
    
    }
    
   this.editProfile = new FormGroup({
    firstName:new FormControl(this.currentUser.firstName,Validators.required),
    lastName: new  FormControl(this.currentUser.lastName,Validators.required), 
  });

  this.editProfile1 = new FormGroup({
    firstName1:new FormControl(this.providerFirstName,Validators.required),
    lastName1: new  FormControl(this.providerLastName,Validators.required),
    description1: new  FormControl(this.providerDescription,Validators.required),
    skillList: this.skills,
});   
  this.skills.push(
    new FormGroup({
      'skill':new FormControl(''),
    })
  );
}

/*--- SKILLS----*/

get listofskills(){    
  return (<FormArray>this.editProfile1.get('skillList')).controls;
}
onAddFirstTime(){
  this.skillFlag=false;
  this.addFlag=false;
}
onAdd(){
  (<FormArray>this.editProfile1.get('skillList')).push(
    new FormGroup({
      'skill':new FormControl(''),
    })
  )
}
deleteSkill(index:number){
  (<FormArray>this.editProfile1.get('skillList')).removeAt(index);
}
  


 /* SAVING USER PROFILE*/
  onSave(){
    
    const user=new UsersModel(this.currentUser.email,
                               this.editProfile.get('firstName').value,
                               this.editProfile.get('lastName').value,this.defaultimageUser,null)
    this.dataservice.editusername(user).subscribe(response=>{
      this.globalserv.updateuser(response);
      this.router.navigate(['/','tabs','profile']);
    this.globalserv.toastMessage("Updated successfully")
    });

    
  }


/*---------SAVING PROVIDER PROFILE---------*/

onSaveProvider(){
  
  const skillsArrary=this.editProfile1.get('skillList').value;
  let skillsarr = [];
  for(var skill of skillsArrary){
    let lg = {
      email:this.currentUser.email,
      skills: skill.skill
    };
    if(lg.skills!=='' || lg.skills!==undefined){
      skillsarr.push(lg); 
    }
  }
  
  const provider=new ProvidersModel(this.currentUser.email,
                                    this.editProfile1.get('firstName1').value,
                                    this.editProfile1.get('lastName1').value,this.defaultimageProvider,this.providerRatings,this.providerHiredTimes,
                                    this.category,this.subCategrory,
                                    this.selectedState,this.selectedCity,
                                    this.editProfile1.get('description1').value)
  
  this.dataservice.saveProviderDetail(provider).subscribe(data=>{
    console.log("message from the saveprovider api"+data);
    this.router.navigate(['/','tabs','profile']);
    this.globalserv.updateProvider(provider);
    this.globalserv.toastMessage("Updated successfully");

  })
  this.dataservice.updateSkills(skillsarr).subscribe(data=>{
    console.log("data from update skills api"+data);
  })
  
}

/*LOCATION LIST*/

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

/*CATEGORY LIST*/

onSelectCategory(selectedValue: any) {
  this.category=selectedValue.detail.value;
  this.dataservice.getSubCategory(this.category).subscribe(data=>{
    this.subCategoryList=data;
});
}
onSelectSubCategory(selectedValue: any) {
  this.subCategrory=selectedValue.detail.value;
}


/* Camera functionalities */
onClick(){
    
  if(!Capacitor.isPluginAvailable('Camera')){
    return;
  }
  Plugins.Camera.getPhoto({
    quality:50,
    source:CameraSource.Prompt,
    correctOrientation:true,
    width:300,
    resultType:CameraResultType.DataUrl,
  }).then(image=>{
    
    this.presentModal(image);
   // this.defaultimage=image.dataUrl;
  }).catch(error=>{
      console.error();
      return false;
  });
}

async presentModal(image) {
  
  this.modalController.create({
    component: CropmodalComponent,
    cssClass: 'my-custom-class',
    componentProps: {
    image:image.dataUrl
    },
    
  }).then(modalEl=>{
    modalEl.present();
    return modalEl.onDidDismiss();
  }).then(result=>{
    if(result.data!=="close"){
      if(!this.bstatus){
        this.defaultimageUser=result.data;
      }else{
        this.defaultimageProvider=result.data;
      }
     
    }
  });
}
}
