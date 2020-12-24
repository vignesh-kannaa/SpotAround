import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProvidersPosts } from 'src/app/Models/providersPost.model';
import { Dataservice } from 'src/app/Services/dataservice.service';
import { GalleryViewerModalComponent } from './gallery-viewer-modal/gallery-viewer-modal.component';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit, OnChanges {

  @Input() id:string;
  loader:boolean=true;
  msgFlag:boolean;
  images:ProvidersPosts[];
  constructor(private dataServ:Dataservice,
    private modalController:ModalController) { }

  ngOnInit() {
   
  
  } 
  ngOnChanges() {
   
     this.dataServ.getPosts(this.id).subscribe(data=>{
    this.images=data;
    this.loader=false;
    if(this.images[0]!=null){
      this.msgFlag=false;
    }else{
      this.msgFlag=true;
    }
   });
  }
  async galleryViewerModal(id) {
    const modal = await this.modalController.create({
      component: GalleryViewerModalComponent,
      cssClass: 'galleryViewerModal',
      componentProps: {
        imagedetails:this.images,
        index:id
        },
    });
    return await modal.present();
    }


  onClick(id){
    this.galleryViewerModal(id);
  }
}