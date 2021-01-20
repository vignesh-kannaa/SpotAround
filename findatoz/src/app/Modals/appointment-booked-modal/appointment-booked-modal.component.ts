import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RequestModel } from 'src/app/Models/RequestModel';

@Component({
  selector: 'app-appointment-booked-modal',
  templateUrl: './appointment-booked-modal.component.html',
  styleUrls: ['./appointment-booked-modal.component.scss'],
})
export class AppointmentBookedModalComponent implements OnInit {

  @Input() appointmentDate:RequestModel;
  appointDate:string;
  appointTime:string;
  constructor(private modalController:ModalController,
    private datepipe:DatePipe) { }

  ngOnInit() {
  this.appointDate= this.datepipe.transform(this.appointmentDate.startDate,'fullDate')
  this.appointTime=this.datepipe.transform(this.appointmentDate.startTime,'shortTime');
  }
  onClose(){
    this.modalController.dismiss(); 
  }
}
