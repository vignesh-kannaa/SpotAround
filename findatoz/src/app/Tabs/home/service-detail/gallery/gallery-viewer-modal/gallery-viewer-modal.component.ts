import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProvidersPosts } from 'src/app/Models/providersPost.model';
import { Dataservice } from 'src/app/Services/dataservice.service';

@Component({
  selector: 'app-gallery-viewer-modal',
  templateUrl: './gallery-viewer-modal.component.html',
  styleUrls: ['./gallery-viewer-modal.component.scss'],
})
export class GalleryViewerModalComponent implements OnInit {

  @Input() imagedetails:ProvidersPosts[];
  @Input() index:number;
  constructor(private modalController:ModalController,
              private dataserv:Dataservice ) { }

  ngOnInit() {
    
  }
  
onClose(){
  this.modalController.dismiss("close");
}
}
