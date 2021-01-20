import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { UsersModel } from 'src/app/Models/Users.model';
import { Dataservice } from 'src/app/Services/dataservice.service';
import { Globalservice } from 'src/app/Services/global.service';
import '@codetrix-studio/capacitor-google-auth';
import { Plugins, registerWebPlugin } from '@capacitor/core';
import { isPlatform } from '@ionic/angular';
 
import { FacebookLogin } from '@capacitor-community/facebook-login';
registerWebPlugin(FacebookLogin);

@Component({
  selector: 'app-onboard',
  templateUrl: './onboard.page.html',
  styleUrls: ['./onboard.page.scss'],
})
export class OnboardPage implements OnInit {
  
  providerMethod:string="";
  userData:UsersModel;
  constructor(private router:Router,
    private dataServ:Dataservice,
    private globalserv:Globalservice,
    public navCtrl:NavController,
    private http: HttpClient) { 
      this.setupFbLogin();
    }

  ngOnInit() {
  }

  onSkip(){
    this.navCtrl.back();
    //this.router.navigate(['/tabs/home']);
  }

  /*facebooklogin*/
  fbLogin: any;
  user = null;
  token = null;
  async setupFbLogin() {
    if (isPlatform('desktop')) {
      this.fbLogin = FacebookLogin;
    } else {
      // Use the native implementation inside a real app!
      const { FacebookLogin } = Plugins;
      this.fbLogin = FacebookLogin;
    } 
  }
 
  async fbLogging() {
    const FACEBOOK_PERMISSIONS = ['email'];
    const result = await this.fbLogin.login({ permissions: FACEBOOK_PERMISSIONS });
 
    if (result.accessToken && result.accessToken.userId) {
      this.token = result.accessToken;
      this.loadUserData();
    } else if (result.accessToken && !result.accessToken.userId) {
      // Web only gets the token but not the user ID
      // Directly call get token to retrieve it now
      this.getCurrentToken();
    } else {
      // Login failed
    }
  }
 
  async getCurrentToken() {    
    const result = await this.fbLogin.getCurrentAccessToken();
 
    if (result.accessToken) {
      this.token = result.accessToken;
      this.loadUserData();
    } else {
      // Not logged in.
    }
  }
 
  async loadUserData() {
    const url = `https://graph.facebook.com/${this.token.userId}?fields=first_name,last_name,picture.width(720),email&access_token=${this.token.token}`;
    this.http.get(url).subscribe(response => {
      this.user = response;
    
       this.userData=new UsersModel(this.user.email,
                                    this.user.first_name,
                                    this.user.last_name,
                                    this.user.picture.data.url,null);
      this.updateUser();
    });
    
   // 
  }
/*facebook login completed */
/*Google login  */
async googleSignup() {
  const googleUser = await Plugins.GoogleAuth.signIn(null) as any;
  const userInfo = googleUser;
  console.log('my user: ', JSON.stringify(userInfo));
  
  this.userData=new UsersModel(userInfo.email,userInfo.givenName,userInfo.familyName,userInfo.imageUrl,null);
  console.log("userdata:"+this.userData.email+" "+this.userData.profilePath);
  this.updateUser();
}

/*Google logn completed */
 updateUser(){
  this.dataServ.socialLogin(this.userData).subscribe(data=>{
                if(data!==null){
                  this.globalserv.setLocalStorageUser(data);
                  this.globalserv.updateuser(data);
                }else{
                  this.globalserv.toastMessage('User already available');
                  }
                });

  this.dataServ.getProviderDetail(this.userData.email).subscribe(response=>{
                  if(response!==null){
                    this.globalserv.updateProvider(response);
                    this.globalserv.setLocalStorageProvider(response);
                  }
                });
      this.dataServ.checkUser(this.userData.email).subscribe(response=>{
        if(response!=null){
          if(response){
            this.router.navigate(['/auth/introscreen']);
          }else{
            this.navCtrl.back();
            //this.router.navigate(['/tabs/home']);
          }
        }
      });
 }

  // socailSignIn(method){
    
  //   if(method==='google'){
  //     this.providerMethod=GoogleLoginProvider.PROVIDER_ID;
  //   }else if(method==='fb'){
  //     this.providerMethod=FacebookLoginProvider.PROVIDER_ID;
  //   }
  //   if(this.providerMethod){
  //     this.authService.signIn(this.providerMethod).then(response=>{
  //     //check whether the user already exists   
  //         const userdata=new UsersModel(response.email,response.firstName,response.lastName,response.photoUrl,null);
  //         this.dataServ.checkUser(userdata.email).subscribe(response=>{
  //           if(response!=null){
  //             if(response){
  //               this.router.navigate(['/auth/introscreen']);
  //             }else{
  //               this.navCtrl.back();
  //               //this.router.navigate(['/tabs/home']);
  //             }
  //           }
  //         });
  //         setTimeout(() => {
  //           this.dataServ.socialLogin(userdata).subscribe(data=>{
  //             if(data!==null){
  //               this.globalserv.setLocalStorageUser(data);
  //               this.globalserv.updateuser(data);
  //             }else{
  //               this.globalserv.toastMessage('User already available');
  //               }
  //             });
  //             this.dataServ.getProviderDetail(userdata.email).subscribe(response=>{
  //               if(response!==null){
  //                 this.globalserv.updateProvider(response);
  //                 this.globalserv.setLocalStorageProvider(response);
  //               }
  //             })
  //         }, 1000);
         
  //         });
  //      }
      
      
  // }


}
