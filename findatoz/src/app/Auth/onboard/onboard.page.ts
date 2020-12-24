import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { UsersModel } from 'src/app/Models/Users.model';
import { Dataservice } from 'src/app/Services/dataservice.service';
import { Globalservice } from 'src/app/Services/global.service';

@Component({
  selector: 'app-onboard',
  templateUrl: './onboard.page.html',
  styleUrls: ['./onboard.page.scss'],
})
export class OnboardPage implements OnInit {
  
  providerMethod:string="";
  constructor(private router:Router,
    private authService: SocialAuthService,
    private dataServ:Dataservice,
    private globalserv:Globalservice,
    private toastController:ToastController) { }

  ngOnInit() {
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'User already available',
      duration: 3000,
      color: "primary",
    
    });
    toast.present();
  }
  onSkip(){
    this.router.navigate(['/tabs/home']);
  }
  socailSignIn(method){
    
    if(method==='google'){
      this.providerMethod=GoogleLoginProvider.PROVIDER_ID;
    }else if(method==='fb'){
      this.providerMethod=FacebookLoginProvider.PROVIDER_ID;
    }
    if(this.providerMethod){
      this.authService.signIn(this.providerMethod).then(response=>{
         
          const userdata=new UsersModel(response.email,response.firstName,response.lastName,response.photoUrl,null);
          this.dataServ.socialLogin(userdata).subscribe(data=>{
              if(data!==null){
                this.globalserv.updateuser(data);
                this.router.navigate(['/tabs/home']);
              }else{
                this.presentToast();
                }
              });
              this.dataServ.getProviderDetail(userdata.email).subscribe(response=>{
                if(response!==null){
                  this.globalserv.updateProvider(response);
                }
              });
          });
       }
      
      
  }
 

}
