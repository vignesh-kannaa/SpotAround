import { Component, OnInit } from '@angular/core';
import { FeedbackModel } from 'src/app/Models/feedback.model';
import { ProvidersModel } from 'src/app/Models/providers.model';
import { UsersModel } from 'src/app/Models/Users.model';
import { Dataservice } from 'src/app/Services/dataservice.service';
import { Globalservice } from 'src/app/Services/global.service';



@Component({
  selector: 'app-feedback-provided',
  templateUrl: './feedback-provided.component.html',
  styleUrls: ['./feedback-provided.component.scss'],
})
export class FeedbackProvidedComponent implements OnInit {

  msgFlag:boolean=true;
  feedback:FeedbackModel[];
  currentUser:UsersModel;
  providers:ProvidersModel[]=[];
  constructor(private dataserv:Dataservice,
    private globalserv:Globalservice) { }

  ngOnInit() {
    this.globalserv.currentUser.subscribe(data=>{
      this.currentUser=data;
      if(this.currentUser){
         this.dataserv.getFeedbackFromId(this.currentUser.email).subscribe(data=>{
            if(data!==null)
              {
                this.feedback=data;
                if(this.feedback[0]?.toId!=null){
                  this.msgFlag=false;
                }
                for(let i=0;i<this.feedback.length;i++){
                  this.dataserv.getProviderDetail(this.feedback[i].toId).subscribe(data=>{
                    
                    this.providers[i]=data;
                    
                  })
              }
              }
          });
        };
    })
   
  }
}