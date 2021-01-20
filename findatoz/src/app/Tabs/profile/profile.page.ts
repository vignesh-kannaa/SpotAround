import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { Router } from '@angular/router';
import { SwitchAccountComponent } from '../../Modals/switch-account/switch-account.component';
import { Globalservice } from 'src/app/Services/global.service';
import { UsersModel } from 'src/app/Models/Users.model';
import { ProvidersModel } from 'src/app/Models/providers.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  defaultimageUser:string='assets/avatar.svg';
  defaultimageProvider:string='assets/avatar.svg';
  createrFlag:boolean;
  currentUser:UsersModel;
  currentProvider:ProvidersModel;
  rating:number=0.0;
  hireTimes:number=0;
  type='profileOptions';
  rate:number;
  
  
  constructor(private modalController:ModalController,
    private router:Router,
    private globalserv:Globalservice,) { }
    
    
    ngOnInit() {
      this.globalserv.currentUser.subscribe(data=>{
        this.currentUser=data;
        if(this.currentUser?.profilePath){
          this.defaultimageUser=this.currentUser.profilePath;
        }
      });
    this.globalserv.bstatus.subscribe(data=>{
      this.createrFlag=data;
    });
    this.globalserv.currentProvider.subscribe(data=>{
      this.currentProvider=data;
      if(this.currentProvider?.imagePath){
        this.defaultimageProvider=this.currentProvider.imagePath;
      }
      if(this.currentProvider?.ratings){
          this.rating=data.ratings;    
          this.rate=this.rating;    
      }
      if(this.currentProvider?.hiredTimes){
          this.hireTimes=data.hiredTimes;
      }
    });
    }

    async presentModal(val) {
      const modal = await this.modalController.create({
        component: SwitchAccountComponent,
        cssClass: 'switchaccountmodal',
        componentProps: {
          value:val
          },    
      });
      return await modal.present();
    }

    switchaccount(val){
      this.presentModal(val);
    }
 
  onEdit(){
    this.router.navigate(['/','tabs','profile','edit-profile']);
  }

  segmentChanged(mode:any){
    this.type=mode.detail.value;
    }
  toPreview(){
    this.router.navigate(['/','tabs','home','service-detail','1']); 
  }
  Mycal(){
  this.router.navigate(['/','tabs','profile','my-calendar']);
  }

}
