import { Injectable, EventEmitter } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { ProvidersModel } from '../Models/providers.model';
import { UsersModel } from '../Models/Users.model';


@Injectable({
  providedIn: 'root'
})
export class Globalservice {

  constructor(public toastController: ToastController,) { }

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
  console.log("current provider:"+data.email);
  this.providers.next(data);
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
  
}
