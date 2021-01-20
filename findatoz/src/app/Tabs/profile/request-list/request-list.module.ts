import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RequestListPageRoutingModule } from './request-list-routing.module';

import { RequestListPage } from './request-list.page';
import { RequestReceivedComponent } from './request-received/request-received.component';
import { RequestSentComponent } from './request-sent/request-sent.component';
import { RequestSentModalComponent } from './request-sent/request-sent-modal/request-sent-modal.component';
import { RateModalComponent } from '../../../Modals/rate-modal/rate-modal.component';
import { RequestReceivedModalComponent } from './request-received/request-received-modal/request-received-modal.component';
import { IonicRatingModule } from 'ionic4-rating';
import { CommonComponentModule } from 'src/app/CommonComponent/common-component.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RequestListPageRoutingModule,
    IonicRatingModule,
    ReactiveFormsModule,
    CommonComponentModule

  ],
  declarations: [RequestListPage,
                RequestReceivedComponent,
                RequestSentComponent,
                RequestSentModalComponent,
                RateModalComponent,
                RequestReceivedModalComponent]
})
export class RequestListPageModule {}
