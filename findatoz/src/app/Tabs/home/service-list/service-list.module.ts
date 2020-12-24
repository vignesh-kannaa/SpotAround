import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiceListPageRoutingModule } from './service-list-routing.module';

import { ServiceListPage } from './service-list.page';
import { LoaderComponent } from 'src/app/CommonComponent/loader/loader.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServiceListPageRoutingModule
  ],
  declarations: [ServiceListPage,LoaderComponent],
  exports:    [ LoaderComponent ]
})
export class ServiceListPageModule {}
