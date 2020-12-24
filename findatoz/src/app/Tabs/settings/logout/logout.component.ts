import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Globalservice } from 'src/app/Services/global.service';

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
    this.modalController.dismiss("loggedout");
}
onClose(){
  this.modalController.dismiss();
}
}
