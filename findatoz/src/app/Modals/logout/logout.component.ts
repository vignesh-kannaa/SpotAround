import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Globalservice } from 'src/app/Services/global.service';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit {
  

  constructor(public modalController: ModalController,
    private globalserv:Globalservice) { }

  ngOnInit() {}

  onClick(){
    this.globalserv.updateuser(null);
    this.globalserv.updateProvider(null);
    this.clearLocalStorage();
    this.modalController.dismiss("loggedout");
    this.globalserv.toastMessage("Logged out successfully")
}
//removing data from local storage
 clearLocalStorage() {
  Storage.clear();
}
onClose(){
  this.modalController.dismiss();
}
}
