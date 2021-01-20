import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-account-created-modal',
  templateUrl: './account-created-modal.component.html',
  styleUrls: ['./account-created-modal.component.scss'],
})
export class AccountCreatedModalComponent implements OnInit {

  constructor(private router:Router,
    private modalController:ModalController,) { }

  ngOnInit() {}


  onClose(){
    this.modalController.dismiss(); 
  }
}
