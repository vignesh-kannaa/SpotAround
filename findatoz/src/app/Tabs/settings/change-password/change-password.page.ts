import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { passvalidator } from 'src/app/Auth/validator';
import { LoginModel } from 'src/app/Models/login.model';
import { UsersModel } from 'src/app/Models/Users.model';
import { Dataservice } from 'src/app/Services/dataservice.service';
import { Globalservice } from 'src/app/Services/global.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {

  currentUser:string;
  constructor(private router:Router,
    private globalserv:Globalservice,
    private dataserv:Dataservice) { }

  ngOnInit() {
    this.globalserv.currentUser.subscribe(data=>{
      console.log("in change password init method:"+data.email);
      this.currentUser=data.email;
    })
  }

  changePassword = new FormGroup({
    oldPassword:new FormControl('',Validators.required),
    password: new  FormControl('',Validators.required),
    confirmPassword: new FormControl('',[Validators.required,passvalidator]),
 
});

onSave(){
  const login=new LoginModel(this.currentUser,this.changePassword.get('oldPassword').value)
  this.dataserv.changePassword(login,this.changePassword.get('password').value).subscribe(response=>{
    //this.globalserv.toastMessage(response);
    console.log(response.toString);
  })
  this.router.navigate(['/','tabs','settings']);
}
}
