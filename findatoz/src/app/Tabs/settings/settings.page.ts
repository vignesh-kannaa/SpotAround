import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { UsersModel } from 'src/app/Models/Users.model';
import { Globalservice } from 'src/app/Services/global.service';
import { Plugins } from '@capacitor/core';
const { Share } = Plugins;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  creatorFlag:boolean;
  currentUser:UsersModel;
  constructor(public modalController: ModalController,
              private globalserv:Globalservice,
              public alertController: AlertController) { }
  
  ngOnInit() {
    this.globalserv.currentUser.subscribe(data=>{
      this.currentUser=data;
    })
    this.globalserv.bstatus.subscribe(data=>{
      this.creatorFlag=data;
   });
  }

  // async switchModal(value) {
  //   const modal = await this.modalController.create({
  //     component: SwitchAccountComponent,
  //     cssClass: 'switchaccountmodal',
  //     componentProps: {
  //       value,
  //       },
  
  //   });
  //   return await modal.present();
  // }
  // switchaccount(val){
  //   this.switchModal(val);
  // }

  async onShare(){
    await Share.share({
      title: 'SpotAround',
      url: 'https://play.google.com/store/apps/details?id=com.spotaround',
      dialogTitle: 'Share with customers'
    });
  }
  
  goPremium(){
    this.presentAlert();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Premium Pack',
      message: 'You can contact us on designstacks2729@gmail.com for further queries',
      buttons: ['OK']
    });

    await alert.present();
  }

}
