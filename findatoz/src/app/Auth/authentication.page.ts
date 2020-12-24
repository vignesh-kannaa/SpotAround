import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import { SignupModel } from '../Models/signup.mdel';
import { UsersModel } from '../Models/Users.model';
import { Dataservice} from '../Services/dataservice.service';
import { Globalservice } from '../Services/global.service';

//import { Globalservice } from '../Services/global.service';
import {passvalidator} from './validator';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.page.html',
  styleUrls: ['./authentication.page.scss'],
})
export class AuthenticationPage implements OnInit {

  signflag:boolean=true;
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

  async presentToast(msg) {
    const toast =  await this.toastController.create({
      message: msg,
      duration: 1000
    });
    toast.present();
  }
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
 
    this.dataserv.getProviderDetail(this.authLogin.get('email').value).subscribe(response=>{
      if(response!==null){
        this.globalserv.updateProvider(response);
      }
    });

    this.dataserv.login(this.authLogin.value).subscribe(response=>{
      if(response!==null){
        this.globalserv.updateuser(response);
        this.router.navigate(['/tabs/home']);
      }
      else{
        this.presentToast("Incorrect password or Sign Up");
      }
    });
    
  }

  
  /*-------------------- SIGNUPMETHOD  ------------*/
  
  onSignUp(){
    const sigupdata=new SignupModel(this.authSignup.get('email').value,
                                    this.authSignup.get('password').value,
                                    this.authSignup.get('firstName').value,
                                    this.authSignup.get('lastName').value)
    
    this.dataserv.signup(sigupdata).subscribe(response=>{
      if(response!==null){
        this.globalserv.updateuser(response);
        this.router.navigate(['/auth/introscreen']);
      }
      else{
        this.presentToast("Account already exists. Try Logging In");
      }
    });
      

    }

    
  
  onSkip(){
    this.router.navigate(['/tabs/home']);
  }

}
