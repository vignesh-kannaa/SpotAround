import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeedbackPageRoutingModule } from './feedback-routing.module';

import { FeedbackPage } from './feedback.page';
import { FeedbackProvidedComponent } from './feedback-provided/feedback-provided.component';
import { FeedbackReceivedComponent } from './feedback-received/feedback-received.component';
import { ServiceDetailPageModule } from '../../home/service-detail/service-detail.module';
import { CommonComponentModule } from 'src/app/CommonComponent/common-component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FeedbackPageRoutingModule,
    ServiceDetailPageModule,
    CommonComponentModule
  ],
  declarations: [FeedbackPage,FeedbackProvidedComponent,FeedbackReceivedComponent]
})
export class FeedbackPageModule {}
