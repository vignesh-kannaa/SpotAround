import { Component, OnInit } from '@angular/core';
import { Globalservice } from 'src/app/Services/global.service';



@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {

  type:string='received';
  
  
  creatorFlag:boolean;

  constructor( private authserv:Globalservice,) { }

  ngOnInit() {
    this.authserv.bstatus.subscribe(data=>{
      this.creatorFlag=data;
   });
  }

  segmentChanged(mode:any){
    this.type=mode.detail.value;
    }
}
