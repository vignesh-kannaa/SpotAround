import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IonicRatingModule } from 'ionic4-rating';
import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';

import { ProfileOptionsComponent } from './profile-options/profile-options.component';
import { PostsComponent } from './posts/posts.component';
import { ImageViewerModalComponent } from './posts/image-viewer-modal/image-viewer-modal.component';
import { ServiceListPageModule } from '../home/service-list/service-list.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    IonicRatingModule,
    ServiceListPageModule
  ],
  declarations: [ProfilePage,ProfileOptionsComponent,PostsComponent,ImageViewerModalComponent]
})
export class ProfilePageModule {}
