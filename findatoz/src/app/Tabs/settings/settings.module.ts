import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingsPageRoutingModule } from './settings-routing.module';

import { SettingsPage } from './settings.page';
import { SwitchAccountComponent } from '../../Modals/switch-account/switch-account.component';
import { LogoutComponent } from '../../Modals/logout/logout.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SettingsPageRoutingModule
  ],
  declarations: [SettingsPage,SwitchAccountComponent,LogoutComponent]
})
export class SettingsPageModule {}
