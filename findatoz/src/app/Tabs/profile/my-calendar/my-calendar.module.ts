import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyCalendarPageRoutingModule } from './my-calendar-routing.module';
import { NgCalendarModule  } from 'ionic2-calendar';
import { MyCalendarPage } from './my-calendar.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyCalendarPageRoutingModule,
    NgCalendarModule
  ],
  declarations: [MyCalendarPage],
  exports:[]
})
export class MyCalendarPageModule {}
