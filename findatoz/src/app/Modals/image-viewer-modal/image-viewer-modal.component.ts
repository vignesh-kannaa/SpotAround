import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProvidersPosts } from 'src/app/Models/providersPost.model';
import { Dataservice } from 'src/app/Services/dataservice.service';
import {AngularFireStorage} from '@angular/fire/storage';
import { Globalservice } from 'src/app/Services/global.service';
@Component({
  selector: 'app-image-viewer-modal',
  templateUrl: './image-viewer-modal.component.html',
  styleUrls: ['./image-viewer-modal.component.scss'],
})
export class ImageViewerModalComponent implements OnInit {

  @Input() imagedetails:ProvidersPosts;;

  
  constructor(private modalController:ModalController,
              private dataserv:Dataservice,
              private angularFireStorage:AngularFireStorage,
              private globalServ:Globalservice ) { }

  ngOnInit() {
    
  }

  onDelete(){
    
   this.dataserv.deletePost(this.imagedetails).subscribe(data=>{
     if(data=='Delete successfully'){
      this.globalServ.onDeleteFireBase(this.imagedetails.pic);
       this.globalServ.toastMessage(data);
     }
   })
    this.modalController.dismiss("deleted");
  }

 

onClose(){
  this.modalController.dismiss("close");
}
}
