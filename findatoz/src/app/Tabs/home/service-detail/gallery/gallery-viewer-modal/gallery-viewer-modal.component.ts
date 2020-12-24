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

  imageCount:number;
  leftFlag:boolean=false;
  rightFlag:boolean=false;
  ngOnInit() {
    this.imageCount=this.imagedetails.length;
   this.checkFlag();
  }
  onNext(){
    this.index+=1;
   this.checkFlag();
  }
  onPrevious(){
    this.index-=1;
    this.checkFlag();
  }
  checkFlag(){
    if(this.index==0){
      this.leftFlag=true;
    }
    if(this.index==this.imagedetails.length-1){
      this.rightFlag=true;
    }
    if(this.index!=0){
      this.leftFlag=false;
    }
    if(this.index!=this.imagedetails.length-1){
      this.rightFlag=false;
    }
  }
onClose(){
  this.modalController.dismiss("close");
}
}
