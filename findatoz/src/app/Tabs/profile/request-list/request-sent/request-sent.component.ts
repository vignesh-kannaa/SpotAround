import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RequestModel } from 'src/app/Models/RequestModel';
import { Dataservice } from 'src/app/Services/dataservice.service';
import { Globalservice } from 'src/app/Services/global.service';
import { RequestSentModalComponent } from './request-sent-modal/request-sent-modal.component';

@Component({
  selector: 'app-request-sent',
  templateUrl: './request-sent.component.html',
  styleUrls: ['./request-sent.component.scss'],
})
export class RequestSentComponent implements OnInit {

  msgFlag:boolean=true;
  loader:boolean=true;
  currentUser:string;
  providersName:string[]=[];
  requestlist:RequestModel[];
  constructor(private dataserv:Dataservice,
            private modalController:ModalController,
            private globalserv:Globalservice) { }


  ngOnInit() {
    this.globalserv.currentUser.subscribe(data=>{
      this.currentUser=data?.email;
    })
    this.dataserv.getRequest(this.currentUser).subscribe(data=>{
      this.requestlist=data;
      this.loader=false;
      if(this.requestlist[0]?.fromId!=null){
        this.msgFlag=false;
      }
      for(let i=0;i<this.requestlist.length;i++){
        this.dataserv.getProviderDetail(this.requestlist[i].toId).subscribe(data=>{
          this.providersName[i]=data.firstName+" "+data.lastName;
        });
      }
    });
    
  }

  async requestModal(id) {
    const modal = await this.modalController.create({
      component: RequestSentModalComponent,
      componentProps: {
        requestdetail:this.requestlist[id],
        providerName:this.providersName[id]
        },
    });
    return await modal.present();
  }

  onClick(val){
    this.requestModal(val);
  }
}
