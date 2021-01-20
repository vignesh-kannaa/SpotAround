import { Injectable, EventEmitter } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { ProvidersModel } from '../Models/providers.model';
import { UsersModel } from '../Models/Users.model';
import { Plugins } from '@capacitor/core';
import {AngularFireStorage} from '@angular/fire/storage';
import { DatePipe } from '@angular/common';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class Globalservice {
////https://spotaround.herokuapp.com/

  constructor(public toastController: ToastController,
    private angularFireStorage:AngularFireStorage,
    private datepipe: DatePipe) { }

  /*Current user data*/
  private user=new BehaviorSubject<UsersModel>(null);  
  currentUser=this.user.asObservable();
  updateuser(data:UsersModel){  //data is updated initially from authentication/onboarding 
    this.user.next(data);
  }

/*Business account switch */
  private businessaccount=new BehaviorSubject<boolean>(null);
  bstatus=this.businessaccount.asObservable();
  updateBusinessStatus(value){
    this.businessaccount.next(value);
  }
/*Providers details*/
private providers=new BehaviorSubject<ProvidersModel>(null);  
currentProvider=this.providers.asObservable();
updateProvider(data:ProvidersModel){//data is updated initially from authentication/onboarding 
  this.providers.next(data);
}

/*Storing local data*/
 setLocalStorageUser(data) {
   Storage.set({
    key: 'user',
    value: JSON.stringify(data)
  });
  
}
setLocalStorageProvider(data){
  Storage.set({
    key: 'provider',
    value: JSON.stringify(data)
  });
}

/*Toaster */
async toastMessage(msg) {
  const toast =  await this.toastController.create({
    message: msg,
    duration: 3000,
    color: "primary",
  });
  toast.present();
}


 /*-----------SaveImage in Firebase--------------*/
 //returns the image saved path
 onSaveFireBase(path,base64Image){
  return new Promise((resolve,reject)=>{
    const uploadFirebase=this.angularFireStorage.ref(path+'/').child(this.datepipe.transform(new Date(),'yyyy-MM-dd,h:mm:ss a').toString());
        uploadFirebase.putString(base64Image,'data_url',{contentType:'image/jpg'}).then(function(){
          uploadFirebase.getDownloadURL().subscribe(data=>{
           resolve(data);
          })
        })
  });
}
//save profile user and provider based on business status
onSaveProfile(path,base64Image,businessStatus){
  return new Promise((resolve,reject)=>{
    var uploadFirebase;
    if(!businessStatus){
       uploadFirebase=this.angularFireStorage.ref(path+'/').child('userProfile');    
    }else{
       uploadFirebase=this.angularFireStorage.ref(path+'/').child('providerProfile');    
      } 
     uploadFirebase.putString(base64Image,'data_url',{contentType:'image/jpg'}).then(function(){
          uploadFirebase.getDownloadURL().subscribe(data=>{
           resolve(data);
          })
        })
  });
}
//delete image in firebase
onDeleteFireBase(pic:string){
  this.angularFireStorage.refFromURL(pic).delete();
}

}
