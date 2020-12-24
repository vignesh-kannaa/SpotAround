import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { RequestModel } from 'src/app/Models/RequestModel';
import { Dataservice } from 'src/app/Services/dataservice.service';



@Component({
  selector: 'app-request-received-modal',
  templateUrl: './request-received-modal.component.html',
  styleUrls: ['./request-received-modal.component.scss'],
})
export class RequestReceivedModalComponent implements OnInit,OnChanges {
  @Input() requestdetail:RequestModel
  @Input() userName:string;

  constructor(private modalController:ModalController,
            public alertController: AlertController,
            public toastController: ToastController,
            public dataserv:Dataservice) { }


  ngOnInit() {

  }
  ngOnChanges(){}

  async presentRejectAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmation',
      message: 'Are you sure? You want to Reject the Request!',
      buttons: [
        {
          text: 'Abort',
          role: 'cancel',
          cssClass: 'secondary',
         
        }, {
          text: 'Confirm',
          handler: () => {
            this.requestdetail.status="Rejected";
            this.dataserv.updateRequestStatus(this.requestdetail).subscribe(data=>{
              console.log(data);
            });
            this.modalController.dismiss();
            this.presentToast("Request is Rejected");
          }
        }
      ]
    });

    await alert.present();
  }


  async presentToast(msg) {
    
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      color: "primary",
    
    });
    toast.present();
  }
  onClose(){
    this.modalController.dismiss();
  }
  approveRequest(){
    this.requestdetail.status="Approved";
    this.dataserv.updateRequestStatus(this.requestdetail).subscribe(data=>{
      console.log(data);
    });
    this.modalController.dismiss();
    this.presentToast("Request is Approved");
  }
  rejectRequest(){
    this.presentRejectAlert();
  }

  markComplete(){
    this.requestdetail.status="Completed";
    this.dataserv.updateRequestStatus(this.requestdetail).subscribe(data=>{
      console.log(data);
    });
    this.modalController.dismiss();
    this.presentToast("Marked as Completed")
  }

}
