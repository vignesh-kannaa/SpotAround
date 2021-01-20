import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';

import { ModalController, Platform } from '@ionic/angular';
import { Plugins, NetworkStatus, PluginListenerHandle } from '@capacitor/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Globalservice } from './Services/global.service';
import { SwitchAccountComponent } from './Modals/switch-account/switch-account.component';
import { LogoutComponent } from './Modals/logout/logout.component';
import { Router } from '@angular/router';
import { UsersModel } from './Models/Users.model';


const { Storage } = Plugins;
const { Share } = Plugins;
const { Network } = Plugins;
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit,OnDestroy{
  
  creatorFlag:boolean=false;
  currentUser:UsersModel;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private globalserv:Globalservice,
    private modalController: ModalController,
    private router:Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  
  networkStatus: NetworkStatus;
  networkListener: PluginListenerHandle;

   async ngOnInit() {
     
    //internet connection validation
    let status = await Network.getStatus();
    if (!status.connected) {
      this.router.navigate(['/error-page']);
      }
    this.networkListener = Network.addListener('networkStatusChange', (status) => {
      this.networkStatus = status;
      if(status.connected==false){
          this.router.navigate(['/error-page']);
        }
    });
    
    //creator flag data
    this.globalserv.bstatus.subscribe(data=>{
      if(data){
      this.creatorFlag=data;
    }else{
      this.creatorFlag=null;
    }
   });
   //current user data
   this.globalserv.currentUser.subscribe(data=>{
    if(data){
       this.currentUser=data;
    }
  });

  //local storage data
  this.getLocalStorageData();
  }

  ngOnDestroy() {
    if (this.networkListener) {
      this.networkListener.remove();
    }
  }
  
  async getLocalStorageData() {
    const userdata = await Storage.get({ key: 'user' });
    const user = userdata.value;
    const providerData=await Storage.get({ key: 'provider'});
    const provider=providerData.value;
//update user and provider using local data
    if(user){
        this.globalserv.updateuser(JSON.parse(user));
      }
      if(provider){
        this.globalserv.updateProvider(JSON.parse(provider));
      }
  }
 
  async switchModal(val) {
    const modal = await this.modalController.create({
      component: SwitchAccountComponent,
      cssClass: 'switchaccountmodal',
      componentProps: {
        value:val
        },
    });
    return await modal.present();
  }
  toBusiness(value){
    this.switchModal(value);
  }

  async logoutModal() {
    const modal = await this.modalController.create({
      component: LogoutComponent,
      cssClass: 'logoutModal'
    }).then(modalEl=>{
      modalEl.present();
      return modalEl.onDidDismiss();
    }).then(result=>{
        if(result.data=="loggedout"){
          this.currentUser=null;
      }})
    
  }
  
  logOut(){
    this.logoutModal();
   
  }
  logging(){
    if(this.currentUser){
      this.logOut();
    }else{
      this.router.navigate(['/auth/onboard']);
    }

  }
  async onShare(){
    await Share.share({
      title: 'SpotAround',
      url: 'https://play.google.com/store/apps/details?id=com.spotaround',
      dialogTitle: 'Share with customers'
    });
  }

  
}

//sharing app  settings.page.ts
//review app  settings.page.html
//sharing profile profile-options.component.ts