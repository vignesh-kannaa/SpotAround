import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Globalservice } from 'src/app/Services/global.service';
import { Plugins, NetworkStatus, PluginListenerHandle } from '@capacitor/core';

const { Network } = Plugins;
@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.page.html',
  styleUrls: ['./error-page.page.scss'],
})
export class ErrorPagePage implements OnInit {

  
  constructor(public navCtrl:NavController,private router:Router,private globalserv:Globalservice){
}
  ngOnInit() {
  }
  async onRetry(){
    let status = await Network.getStatus();
    if (status.connected) {
      this.navCtrl.back();
      }
    else{
        this.globalserv.toastMessage("Your are not connected to internet")
    }
  }
}
