import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RequestModel } from 'src/app/Models/RequestModel';
import { Dataservice } from 'src/app/Services/dataservice.service';
import { Globalservice } from 'src/app/Services/global.service';

import { RequestReceivedModalComponent } from './request-received-modal/request-received-modal.component';

@Component({
  selector: 'app-request-received',
  templateUrl: './request-received.component.html',
  styleUrls: ['./request-received.component.scss'],
})
export class RequestReceivedComponent implements OnInit {
  
  msgFlag:boolean=true;
  currentUser:string;
  requestlist:RequestModel[];
  UsersName:string[]=[];

  constructor(private dataserv:Dataservice,
            private modalController:ModalController,
            private globalserv:Globalservice) { }


  ngOnInit() {
    this.globalserv.currentUser.subscribe(data=>{
      this.currentUser=data?.email;
    })
    this.dataserv.getRequestToId(this.currentUser).subscribe(data=>{
      this.requestlist=data;
      if(this.requestlist[0]?.fromId!=null){
        this.msgFlag=false;
      }
      for(let i=0;i<this.requestlist.length;i++){
        this.dataserv.getUserDetails(this.requestlist[i].fromId).subscribe(data=>{
          this.UsersName[i]=data.firstName+" "+data.lastName;
        });
      }
    })
    
  }


  async requestModal(id) {
    const modal = await this.modalController.create({
      component: RequestReceivedModalComponent,
      
      componentProps: {
        requestdetail:this.requestlist[id],
        userName:this.UsersName[id]
        },
    });
    return await modal.present();
  }
  onClick(val){
   
    this.requestModal(val);
  }
}
