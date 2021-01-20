import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
})
export class LoginModalComponent implements OnInit {

  constructor(public modalController: ModalController,
    public router:Router) { }

  ngOnInit() {}
  onClick(){
    this.router.navigate(['/','auth','onboard']);
    this.modalController.dismiss();
}
onClose(){
  this.modalController.dismiss();
}
}
