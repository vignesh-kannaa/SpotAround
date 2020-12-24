import { Component, OnInit } from '@angular/core';
import { FeedbackModel } from 'src/app/Models/feedback.model';
import { ProvidersModel } from 'src/app/Models/providers.model';
import { UsersModel } from 'src/app/Models/Users.model';
import { Dataservice } from 'src/app/Services/dataservice.service';
import { Globalservice } from 'src/app/Services/global.service';

@Component({
  selector: 'app-feedback-received',
  templateUrl: './feedback-received.component.html',
  styleUrls: ['./feedback-received.component.scss'],
})
export class FeedbackReceivedComponent implements OnInit {

  msgFlag:boolean=true;
  feedback:FeedbackModel[];
  currentProvider:ProvidersModel;
  Users:UsersModel[]=[];
  constructor(private dataserv:Dataservice,
    private globalserv:Globalservice) { }

  ngOnInit() {
    
    this.globalserv.currentProvider.subscribe(data=>{
      this.currentProvider=data;
      if(this.currentProvider){
        this.dataserv.getFeedbackToId(this.currentProvider.email).subscribe(data=>{
      
          if(data!==null)
          {
            this.feedback=data;
            if(this.feedback[0]?.fromId!=null){
              this.msgFlag=false;
            }
            for(let i=0;i<this.feedback.length;i++){
              this.dataserv.getUserDetails(this.feedback[i].fromId).subscribe(data=>{
                this.Users[i]=data;
                console.log("data for user details api: "+this.Users[i].firstName);
              })
          }
          }
        });
      }
    })
    
  }
}
