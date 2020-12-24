import { Component, OnInit } from '@angular/core';
import { Globalservice } from 'src/app/Services/global.service';


@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.page.html',
  styleUrls: ['./request-list.page.scss'],
})
export class RequestListPage implements OnInit {

 
  type:string='received';
  
  creatorFlag:boolean;


  constructor(
    private authserv:Globalservice,) { }

  ngOnInit() {
    
    this.authserv.bstatus.subscribe(data=>{
      this.creatorFlag=data;
   });
  }

  segmentChanged(mode:any){
    this.type=mode.detail.value;
    }

}
