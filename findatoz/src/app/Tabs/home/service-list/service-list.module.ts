import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiceListPageRoutingModule } from './service-list-routing.module';

import { ServiceListPage } from './service-list.page';
import { FilterModalComponent } from './filter-modal/filter-modal.component';
import { CommonComponentModule } from 'src/app/CommonComponent/common-component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServiceListPageRoutingModule,
    CommonComponentModule
  ],
  declarations: [ServiceListPage,FilterModalComponent],
})
export class ServiceListPageModule {}
