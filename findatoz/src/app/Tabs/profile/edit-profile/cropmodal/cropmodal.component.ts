import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ImageCroppedEvent,ImageCropperComponent } from 'ngx-image-cropper';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-cropmodal',
  templateUrl: './cropmodal.component.html',
  styleUrls: ['./cropmodal.component.scss'],
})
export class CropmodalComponent implements OnInit {

 @ViewChild(ImageCropperComponent,{static:false}) angularcropper:ImageCropperComponent;
  @Input() image:string;
  imagesource;

  constructor(private modalctrl:ModalController) { }
 // croppedImage=null;
  ngOnInit() {
    
    this.imagesource=this.image;
  }

  // imageCropper(event:ImageCroppedEvent){
  //   this.croppedImage=event.base64;
  // }
  savecrop(){
   
   this.modalctrl.dismiss(this.angularcropper.crop().base64,this.imagesource);

 }
 onClose(){
    this.modalctrl.dismiss("close");
 }

}
