import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { RequestModel } from 'src/app/Models/RequestModel';
import { Dataservice } from 'src/app/Services/dataservice.service';


import { RateModalComponent } from './rate-modal/rate-modal.component';

@Component({
  selector: 'app-request-sent-modal',
  templateUrl: './request-sent-modal.component.html',
  styleUrls: ['./request-sent-modal.component.scss'],
})
export class RequestSentModalComponent implements OnInit,OnChanges {

  @Input() requestdetail:RequestModel;
  @Input() providerName:string;
  
  rated:boolean=false;
  constructor(private dataServ:Dataservice,
            private modalController:ModalController,
            public alertController: AlertController,
            public toastController: ToastController) { }


  ngOnInit() {
    this.dataServ.getFeedback(this.requestdetail.fromId,this.requestdetail.toId).subscribe(data=>{
      this.rated=data;
    });
}
ngOnChanges(){
  console.log("provider name: "+this.providerName);
}

  async presentCancelAlert(msg) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmation',
      message: msg,
      buttons: [
        {
          text: 'Abort',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          
          }
        }, {
          text: 'Confirm',
          handler: () => {
            this.requestdetail.status="CancelRequest";
            this.dataServ.updateRequestStatus(this.requestdetail).subscribe(data=>{
            console.log(data);
          });
            this.modalController.dismiss();
            this.presentToast("Request Cancelled");
          }
        }
      ]
    });

    await alert.present();
  }
  async presentCancelApprovedAlert(msg) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmation',
      message: msg,
      buttons: [
        {
          text: 'Abort',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          
          }
        }, {
          text: 'Confirm',
          handler: () => {
            this.requestdetail.status="Cancelled";
            this.dataServ.updateRequestStatus(this.requestdetail).subscribe(data=>{
            console.log(data);
          });
            this.modalController.dismiss();
            this.presentToast("Request Cancelled");
          }
        }
      ]
    });

    await alert.present();
  }
  async rateModal(data) {
    const modal = await this.modalController.create({
      component: RateModalComponent,
      cssClass: 'ratemodal',
      componentProps: {
        requestdetail:data,
        },
      });
    return await modal.present();
  }
  async presentToast(mes) {
    const toast = await this.toastController.create({
      message: mes,
      duration: 3000,
      color: "primary",
    
    });
    toast.present();
  }
  


  onClose(){
    this.modalController.dismiss();
  }

  Rate(){
    this.rateModal(this.requestdetail);
  }

  CancelRequest(){

    this.presentCancelAlert('Are you sure? You want to Cancel the Request!');
  }

  CancelApprovedRequest(){
   
    this.presentCancelApprovedAlert('Are you sure? You want to Cancel the Approved Request!');
  }
}
