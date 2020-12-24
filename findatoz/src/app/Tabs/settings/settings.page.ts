import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UsersModel } from 'src/app/Models/Users.model';
import { Globalservice } from 'src/app/Services/global.service';
import { LogoutComponent } from './logout/logout.component';
import { SwitchAccountComponent } from './switch-account/switch-account.component';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  creatorFlag:boolean;
  currentUser:UsersModel;
  constructor(public modalController: ModalController,
              private globalserv:Globalservice,) { }
  
  ngOnInit() {
    this.globalserv.currentUser.subscribe(data=>{
      this.currentUser=data;
    })
    this.globalserv.bstatus.subscribe(data=>{
      this.creatorFlag=data;
   });
  }

  async switchModal(value) {
    const modal = await this.modalController.create({
      component: SwitchAccountComponent,
      cssClass: 'switchaccountmodal',
      componentProps: {
        value,
        },
  
    });
    return await modal.present();
  }
  switchaccount(val){
    this.switchModal(val);
  }

  // async logoutModal() {
  //   const modal = await this.modalController.create({
  //     component: LogoutComponent,
  //     cssClass: 'logoutModal'
  //   });
  //   return await modal.present();
  // }
  
  // logOut(){
  //   this.logoutModal();
  // }

}
