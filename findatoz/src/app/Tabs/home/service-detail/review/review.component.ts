import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FeedbackModel } from 'src/app/Models/feedback.model';
import { Dataservice } from 'src/app/Services/dataservice.service';



@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent implements OnInit,OnChanges {

  loader:boolean=true;
  @Input() id:string;
  msgFlag:boolean;
  feedback:FeedbackModel[];
  feedbackdetail:{
    fromName:string,
    profileImage:string,
    review:string,
    rating:number,    
  }[]=[{
    fromName:"",
    profileImage:"",
    review:"",
    rating:0
  }];
  constructor(private dataserv:Dataservice) { }

  ngOnInit() {
    
  }
  ngOnChanges(){
  
    this.dataserv.getFeedbackToId(this.id).subscribe(data=>{
      this.feedback=data;
      this.loader=false;
      if(this.feedback){
        if(this.feedback[0]!=null){
          this.msgFlag=false;
        }
        else{
          this.msgFlag=true;
        }
        for(let i=0;i<this.feedback.length;i++){
          this.dataserv.getUserDetails(this.feedback[i].fromId).subscribe(data=>{
          
            this.feedbackdetail[i].fromName=data.firstName;
            this.feedbackdetail[i].profileImage=data.profilePath;
            this.feedbackdetail[i].review=this.feedback[i].review;
            this.feedbackdetail[i].rating=this.feedback[i].rating;
            
          });
        }
    }
    });

  }
}
