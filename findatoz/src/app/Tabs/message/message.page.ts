import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Dataservice } from 'src/app/Services/dataservice.service';
import { Globalservice } from 'src/app/Services/global.service';
import { UsersModel } from 'src/app/Models/Users.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {

  constructor(private route:Router,
              private dataserv:Dataservice,
              private globalServ:Globalservice) { }

  msgFlag:boolean=true; //to display messages to the user 
  filterData:any;
  currentUser:UsersModel=null;
  chatList:UsersModel[]=null;
  chatDetail:{
    email:string,
    name:string,
    profile:string,
  }[]=[{
    email:"",
    name:"",
    profile:""
  }];
 
  ngOnInit() {
      this.globalServ.currentUser.subscribe(data=>{
        this.currentUser=data;
        if(this.currentUser?.email){        
           this.dataserv.chatlist(this.currentUser.email).subscribe(data=>{
             
             if(data!==null && data!==undefined && data){
              console.log("data from chat list "+data);
              this.chatList=data;
                if(this.chatList[0]?.email){ 
                  this.msgFlag=false;
                }
                  /*----The chat member may also be a provider so checking in provider table----*/
                  for(let i=0;i<this.chatList.length;i++){
                    this.dataserv.getProviderDetail(this.chatList[i].email).subscribe(data=>{
                      if(data!==null){
                        this.chatDetail[i].name=data.firstName+" "+data.lastName;
                        this.chatDetail[i].profile=data.imagePath;
                        this.chatDetail[i].email=data.email;
                      }else{
                        this.chatDetail[i].name=this.chatList[i].firstName+" "+this.chatList[i].lastName;
                        this.chatDetail[i].profile=this.chatList[i].profilePath;
                        this.chatDetail[i].email=this.chatList[i].email;
                      }
                    });
                  }
                this.filterData=this.chatDetail;  
             } 
         });
        }
      });   
    
      }
  



  initializeItems(){
    this.filterData=this.chatList;
  }
  getItems(ev:any){
    this.initializeItems();
    const val = ev.target.value;
    if (val && val.trim() != '') {
      this.filterData = this.chatList.filter((item) => {
        return (item.email.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
  message(name){   
   this.route.navigate(['/','tabs','message','chat',name]);
  }
}
