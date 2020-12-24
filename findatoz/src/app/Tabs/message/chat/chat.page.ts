import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Globalservice } from 'src/app/Services/global.service';
import { Dataservice } from 'src/app/Services/dataservice.service';
import { MessageModel } from '../../../Models/message.model';
import { UsersModel } from 'src/app/Models/Users.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  @ViewChild('content',{static:false}) content:IonContent;
  
  currentUser:UsersModel;
  to_user_id:any;   
  newmsg="";
  messages:MessageModel[]=[];  
  UserName:string;
  infoFlag:boolean=false;

  constructor(private acitivaterouter:ActivatedRoute,
              private globalserv:Globalservice,
              private dataserv:Dataservice,
              private router:Router) {}
  
  ngOnInit() {
    this.acitivaterouter.paramMap.subscribe((paramMap)=>{
      this.to_user_id=paramMap.get('id');
      this.dataserv.getUserDetails(this.to_user_id).subscribe(data=>{
        this.UserName=data.firstName+" "+data.lastName; 
      });
  });
  this.dataserv.getProviderDetail(this.to_user_id).subscribe(data=>{
    if(data){
      this.infoFlag=true;
    }
  })
  this.globalserv.currentUser.subscribe(data=>{
    this.currentUser=data;
    
    if(this.currentUser?.email){
      this.dataserv.chats(new MessageModel(this.currentUser.email,this.to_user_id,null,null)).subscribe(data=>{
         this.messages=data;
      });
    }
  });
 
}
ionViewWillEnter(){
  this.content.scrollToBottom();
}
ionViewDidEnter(){
  this.content.scrollToBottom();
}
sendmsg(){
  this.dataserv.chats(new MessageModel(this.currentUser.email,this.to_user_id,this.newmsg,new Date)).subscribe(data=>{
    setTimeout(() => {
      this.messages=data;  
    });
    setTimeout(() => {
      this.content.scrollToBottom();  
    });
  });
  this.newmsg='';
  
}
infoDetail(){
  this.router.navigate(['/','tabs','home','service-detail',this.to_user_id]);
 }
}
