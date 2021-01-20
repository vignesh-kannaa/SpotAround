import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { SignupModel } from '../Models/signup.mdel';
import { Dataservice} from '../Services/dataservice.service';
import { Globalservice } from '../Services/global.service';
import {passvalidator} from './validator';


@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.page.html',
  styleUrls: ['./authentication.page.scss'],
})
export class AuthenticationPage implements OnInit {

  signflag:boolean=true;
  loader:boolean=false;
  

  constructor(private router:Router,
              private dataserv:Dataservice,
              public toastController: ToastController,
              public globalserv:Globalservice,
              ) { }
  authLogin = new FormGroup({
      email:new FormControl('',{
                updateOn:'blur',
                validators:[Validators.required,Validators.email]
                }),
      password: new  FormControl('',[Validators.required]),
   
  })
  
  authSignup = new FormGroup({
    email:new FormControl('',{
              updateOn:'blur',
              validators:[Validators.required,Validators.email]
               }),
    password: new  FormControl('',[Validators.required]),
    confirmpassword: new FormControl('',[Validators.required,passvalidator]),
    firstName: new  FormControl('',[Validators.required]),
    lastName: new  FormControl('',[Validators.required]),
  })

 
  ngOnInit() {
    
  }
  ionViewWillEnter(){
    this.authSignup.reset();
    this.authLogin.reset();
  }
  changeflag(){
    this.signflag=!this.signflag;
    this.authSignup.reset();
    this.authLogin.reset();
  }
 


  // onLogIn(){

  //       this.globalserv.updateuser(new UsersModel('mike@g','Michel','Ross',null,null));
  //       this.router.navigate(['/tabs/home']);
      
  // }
/*-------------------- LOGIN METHOD  ------------*/
  onLogIn(){
    this.loader=true;
    this.dataserv.login(this.authLogin.value).subscribe(response=>{
      if(response!==null){
        this.globalserv.setLocalStorageUser(response);
        this.globalserv.updateuser(response);
        this.router.navigate(['/tabs/home']);
        
      }
      else{
        this.globalserv.toastMessage("Incorrect password or Sign Up");
       
      }
      this.loader=false;
    });
    this.dataserv.getProviderDetail(this.authLogin.get('email').value).subscribe(response=>{
      if(response!==null){
        this.globalserv.setLocalStorageProvider(response);
        this.globalserv.updateProvider(response);
      }
    });
  }

  
  /*-------------------- SIGNUPMETHOD  ------------*/
  
  onSignUp(){
    this.loader=true;
    const sigupdata=new SignupModel(this.authSignup.get('email').value,
                                    this.authSignup.get('password').value,
                                    this.authSignup.get('firstName').value,
                                    this.authSignup.get('lastName').value)
    
    this.dataserv.signup(sigupdata).subscribe(response=>{
      if(response!==null){
        this.globalserv.setLocalStorageUser(response);
        this.globalserv.updateuser(response);
        this.router.navigate(['/auth/introscreen']);
      }
      else{
        this.globalserv.toastMessage("Account already exists. Try Logging In");
      }
      this.loader=false;
    });
  }
  
  onSkip(){
    this.router.navigate(['/tabs/home']);
  }

}