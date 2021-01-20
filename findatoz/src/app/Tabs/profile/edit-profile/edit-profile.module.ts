import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';
import { IonicModule } from '@ionic/angular';

import { EditProfilePageRoutingModule } from './edit-profile-routing.module';

import { EditProfilePage } from './edit-profile.page';
import { CropmodalComponent } from '../../../Modals/cropmodal/cropmodal.component';
import { CommonComponentModule } from 'src/app/CommonComponent/common-component.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditProfilePageRoutingModule,
    ReactiveFormsModule,
    ImageCropperModule,
    CommonComponentModule
  ],
  declarations: [EditProfilePage,CropmodalComponent]
})
export class EditProfilePageModule {}
