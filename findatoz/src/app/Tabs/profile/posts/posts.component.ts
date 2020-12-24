import { Component, OnInit } from '@angular/core';

import {Plugins, Capacitor, CameraSource, CameraResultType} from '@capacitor/core'
import { ModalController } from '@ionic/angular';
import { CropmodalComponent } from '../edit-profile/cropmodal/cropmodal.component';
import { Dataservice } from 'src/app/Services/dataservice.service';
import { Globalservice } from 'src/app/Services/global.service';
import { ProvidersPosts } from 'src/app/Models/providersPost.model';
import { ImageViewerModalComponent } from './image-viewer-modal/image-viewer-modal.component';
import { OnChanges } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit,OnChanges {

  images:ProvidersPosts[];
  currentProvider:string;
  loader:boolean=true;
  msgFlag:boolean;
  constructor(private dataServ:Dataservice,
    private modalController:ModalController,
    private globalServ:Globalservice) { }
    
  ngOnChanges() {
   
  }
  ngOnInit() {
  console.log("currentprovider: "+this.currentProvider)
    this.globalServ.currentProvider.subscribe(data=>{
      this.currentProvider=data?.email;
      if(this.currentProvider==null){
        this.loader=false;
        this.msgFlag=true;
      }
      if(this.currentProvider!=null){
        this.dataServ.getPosts(this.currentProvider).subscribe(data=>{
          this.loader=false;
          if(data[0]!=null){
            this.msgFlag=false;
          }else{
            this.msgFlag=true;
          }
          
          this.images=data;

        });
      }
    })
  }
  onUpload(){
    
      if(!Capacitor.isPluginAvailable('Camera')){
        return;
      }
      Plugins.Camera.getPhoto({
        quality:50,
        source:CameraSource.Prompt,
        correctOrientation:true,
        width:300,
        resultType:CameraResultType.DataUrl,
      }).then(image=>{
        
        this.presentModal(image);
       // this.defaultimage=image.dataUrl;
      }).catch(error=>{
          console.error();
          return false;
      });
    }
  
    async presentModal(image) {
      this.modalController.create({
        component: CropmodalComponent,
        cssClass: 'my-custom-class',
        componentProps: {
        image:image.dataUrl
        },
        
      }).then(modalEl=>{
        modalEl.present();
        return modalEl.onDidDismiss();
      }).then(result=>{
        if(result.data!=="close"){
          this.dataServ.uploadPost(new ProvidersPosts(this.currentProvider,result.data)).subscribe(data=>
            this.images=data);
        }
      });
    }
    async imageViewerModal(id) {
      const modal = await this.modalController.create({
        component: ImageViewerModalComponent,
        cssClass: 'imageViewerModal',
        componentProps: {
          imagedetails:this.images[id],
          },
      }).then(modalEl=>{
        modalEl.present();
        return modalEl.onDidDismiss();
      }).then(result=>{
        if(result.data!=="close"){
          this.dataServ.getPosts(this.currentProvider).subscribe(data=>{
                this.images=data;
          });
        }
      });
    }
  
    imageClick(id){
      this.imageViewerModal(id);
    }
  }

