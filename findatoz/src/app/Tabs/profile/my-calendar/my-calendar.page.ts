import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CalendarComponent } from 'ionic2-calendar';
import { CalendarEventsModel } from 'src/app/Models/calendarEvents.model';
import { ProvidersModel } from 'src/app/Models/providers.model';
import { RequestModel } from 'src/app/Models/RequestModel';
import { Dataservice } from 'src/app/Services/dataservice.service';
import { Globalservice } from 'src/app/Services/global.service';

@Component({
  selector: 'app-my-calendar',
  templateUrl: './my-calendar.page.html',
  styleUrls: ['./my-calendar.page.scss'],
})
export class MyCalendarPage implements OnInit {


  @ViewChild(CalendarComponent) myCal: CalendarComponent;
  
  eventSource=[];
  currentProvider:ProvidersModel;
  requestList:RequestModel[]=[]
  selectedDay:any;
  viewTitle:string;
  calendar={
    mode:'month',
    currentDate:new Date(),
  }
  constructor(public modalController: ModalController, 
    private dataServ:Dataservice,
    private glovalserv:Globalservice) {}
 
  ngOnInit() {

    this.glovalserv.currentProvider.subscribe(data=>{
      this.currentProvider=data;
    });
    if(this.currentProvider){
   this.dataServ.getRequestToId(this.currentProvider.email).subscribe(data=>{
      this.requestList=data;
      const totalEvents=this.eventSource;
     for(let i=0;i<this.requestList.length;i++){
      if(this.requestList[i].status==='Approved'){
        const event=new CalendarEventsModel(this.requestList[i].fromId+'-'+this.requestList[i].reqCity,
                                            new Date(this.requestList[i].startTime),
                                            new Date(this.requestList[i].endTime),false);
        totalEvents.push(event);
      }
    }      
   
    this.eventSource=[];
      setTimeout(() => {
        this.eventSource=totalEvents;  
      });
      console.log(this.eventSource.values);

   });
  }
  }
  next() {
    this.myCal.slideNext();
  }
 
  back() {
    this.myCal.slidePrev();
  }

  onViewTitleChanged(title){
    this.viewTitle=title;
  }
}
