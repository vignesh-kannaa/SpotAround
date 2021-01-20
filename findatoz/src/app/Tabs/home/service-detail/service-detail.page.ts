import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ModalController } from '@ionic/angular';
import { HireRequestModalComponent } from './hire-request-modal/hire-request-modal.component';
import { Globalservice } from 'src/app/Services/global.service';
import { UsersModel } from 'src/app/Models/Users.model';
import { LoginModalComponent } from '../../../Modals/login-modal/login-modal.component';
import { ProvidersModel } from 'src/app/Models/providers.model';
import { Dataservice } from 'src/app/Services/dataservice.service';



@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.page.html',
  styleUrls: ['./service-detail.page.scss'],
})
export class ServiceDetailPage implements OnInit {

  
  servicedetail:ProvidersModel;
  providerid:string;
  type:string='gallery';
  currentUser:UsersModel;
  loader:boolean=true;
  constructor(private acitivaterouter:ActivatedRoute,
              private dataServ:Dataservice,
              public modalController: ModalController,
              private globalserv:Globalservice,
              private route:Router,
      ) { }

  ngOnInit() {
    this.acitivaterouter.paramMap.subscribe((paramMap)=>{
        this.providerid=paramMap.get('id');
      this.dataServ.getProviderDetail(this.providerid).subscribe(data=>{
        this.loader=false;
        this.servicedetail=data;
      });
     // this.servicedetailServ.updateProviderGallery(this.providerid);
      this.globalserv.currentUser.subscribe(data=>{
        this.currentUser=data;
      });
      });
}
segmentChanged(mode:any){
  this.type=mode.detail.value;
  }
// modal to get the details for the requests
  async presentModal() {
    const modal = await this.modalController.create({
      component: HireRequestModalComponent,
      cssClass: 'hireRequestmodal',
      componentProps: {
        providerid:this.providerid
        },
    });
    return await modal.present();
  }
// popup to signin if not signed in
  async loginModal() {
    const modal = await this.modalController.create({
      component: LoginModalComponent,
      cssClass: 'logoutModal'
    });
    return await modal.present();
  }

  hirerequest(){
  // this.presentModal();  
    if(this.currentUser?.email){
      this.presentModal();  
    }else{
      this.loginModal();
    }
    
  }
  sendMessage(name){
    if(this.currentUser?.email){
      this.route.navigate(['/','tabs','message','chat',name]);
    }else{
      this.loginModal();
    }
  }
 
}
