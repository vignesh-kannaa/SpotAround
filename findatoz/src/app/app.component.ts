import { Component, OnInit, Renderer2 } from '@angular/core';

import { ModalController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Globalservice } from './Services/global.service';
import { SwitchAccountComponent } from './Tabs/settings/switch-account/switch-account.component';
import { LogoutComponent } from './Tabs/settings/logout/logout.component';
import { Router } from '@angular/router';
import { UsersModel } from './Models/Users.model';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit{

  creatorFlag:boolean=false;
  currentUser:UsersModel;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private globalserv:Globalservice,
    private modalController: ModalController,
    private renderer:Renderer2,
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
  
  ngOnInit(): void {
    
    this.globalserv.bstatus.subscribe(data=>{
      if(data){
      this.creatorFlag=data;
      console.log("creator flag in app component:"+this.creatorFlag);
    }
   });
   this.globalserv.currentUser.subscribe(data=>{
    if(data){
       this.currentUser=data;
       console.log("current user in app component"+this.currentUser);
    }
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
  onToggle(event){
    
    if(event.detail.checked){
     
     this.renderer.setAttribute(document.body,'color-theme','dark')
    }
    if(!event.detail.checked){
      this.renderer.setAttribute(document.body,'color-theme','light')
    }
  }
  
}
