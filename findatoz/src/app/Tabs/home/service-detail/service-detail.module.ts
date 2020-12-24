import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiceDetailPageRoutingModule } from './service-detail-routing.module';

import { ServiceDetailPage } from './service-detail.page';
import { GalleryComponent } from './gallery/gallery.component';
import { ReviewComponent } from './review/review.component';
import {AboutmeComponent} from './aboutme/aboutme.component';
import { HireRequestModalComponent } from './hire-request-modal/hire-request-modal.component';
import { GalleryViewerModalComponent } from './gallery/gallery-viewer-modal/gallery-viewer-modal.component';
import { ServiceListPageModule } from '../service-list/service-list.module';
import { LoginModalComponent } from './login-modal/login-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ServiceDetailPageRoutingModule,
    ServiceListPageModule
  ],
  declarations: [ServiceDetailPage,GalleryComponent,ReviewComponent,AboutmeComponent,HireRequestModalComponent,GalleryViewerModalComponent,LoginModalComponent],
  exports:[ReviewComponent]
})
export class ServiceDetailPageModule {}
