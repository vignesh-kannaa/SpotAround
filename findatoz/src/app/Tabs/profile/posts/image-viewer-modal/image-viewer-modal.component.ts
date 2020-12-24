import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProvidersPosts } from 'src/app/Models/providersPost.model';
import { Dataservice } from 'src/app/Services/dataservice.service';

@Component({
  selector: 'app-image-viewer-modal',
  templateUrl: './image-viewer-modal.component.html',
  styleUrls: ['./image-viewer-modal.component.scss'],
})
export class ImageViewerModalComponent implements OnInit {

  @Input() imagedetails:ProvidersPosts;;

  
  constructor(private modalController:ModalController,
              private dataserv:Dataservice ) { }

  ngOnInit() {
    
  }

  onDelete(){
    console.log("inside teh delete method");
   this.dataserv.deletePost(this.imagedetails).subscribe(data=>{
     console.log("data from delete api: "+data);
   })
    this.modalController.dismiss("deleted");
  }

 

onClose(){
  this.modalController.dismiss("close");
}
}
