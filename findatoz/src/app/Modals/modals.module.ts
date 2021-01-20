import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AccountCreatedModalComponent } from './account-created-modal/account-created-modal.component';
import { AppointmentBookedModalComponent } from './appointment-booked-modal/appointment-booked-modal.component';


@NgModule({
  imports: [
    IonicModule],
  declarations: [
    AppointmentBookedModalComponent,
    AccountCreatedModalComponent
    ],
  exports:[AccountCreatedModalComponent,AppointmentBookedModalComponent]
})
export class ModalsModule {}
