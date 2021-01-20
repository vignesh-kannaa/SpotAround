import { noUndefined } from '@angular/compiler/src/util';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AccountCreatedModalComponent } from 'src/app/Modals/account-created-modal/account-created-modal.component';
import { Globalservice } from 'src/app/Services/global.service';


@Component({
  selector: 'app-switch-account',
  templateUrl: './switch-account.component.html',
  styleUrls: ['./switch-account.component.scss'],
})
export class SwitchAccountComponent implements OnInit {

  @Input() value:string;
  creatorFlag:boolean;
  constructor(public modalController: ModalController,
              private globalserv:Globalservice,) { }

  ngOnInit() {
    this.globalserv.bstatus.subscribe(data=>{
      this.creatorFlag=data;
   });
  }

  onClick(){
    if(this.creatorFlag){
      this.globalserv.toastMessage("Switched to Normal Account");
    } else{
      this.globalserv.toastMessage("Switched to Business Account")
    }
    
    this.globalserv.updateBusinessStatus(this.value);
    this.modalController.dismiss();
}


  onClose(){
  this.modalController.dismiss();
}
}
