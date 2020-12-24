import { Injectable } from '@angular/core';
import { LoginModel } from '../Models/login.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { MessageModel } from '../Models/message.model';
import { SignupModel } from '../Models/signup.mdel';
import { UsersModel } from '../Models/Users.model';
import { RequestModel } from '../Models/RequestModel';
import { ProvidersModel } from '../Models/providers.model';
import { FeedbackModel } from '../Models/feedback.model';
import { ProvidersPosts } from '../Models/providersPost.model';
import { ProvidersSkillsModel } from '../Models/providersSkill.model';
import { CategoryModel } from '../Models/category.model';


@Injectable({
  providedIn: 'root'
})
export class Dataservice {

  constructor(private http:HttpClient) { }

/*-------------    AUTHENTICATION      ----------------*/
////https://spotaround.herokuapp.com/

  signup(signup:SignupModel){
    return this.http.post<UsersModel>('http://localhost:8080/signup',signup);
  }
  login(login:LoginModel){
    return this.http.post<UsersModel>('http://localhost:8080/login',login);
  }
  socialLogin(userdata:UsersModel){
    return this.http.post<UsersModel>('http://localhost:8080/socialLogin',userdata);
  }
  editusername(user:UsersModel){
    return this.http.post<UsersModel>('http://localhost:8080/editUserName',user)
  }
  changePassword(logindata:LoginModel,password:string){
    const requestOptions: Object = {
      responseType: 'text'
    }
    return this.http.post<string>('http://localhost:8080/changePassword?pass='+password,logindata,requestOptions);
  }

  /*-------------    PROVIDERS      ----------------*/
   
  saveProviderDetail(providerData:ProvidersModel){
    const requestOptions: Object = {
      responseType: 'text'
    }
    return this.http.post<string>('http://localhost:8080/saveProviderDetail',providerData,requestOptions);
  }
  getProviderDetail(emailId:string){
    return this.http.get<ProvidersModel>('http://localhost:8080/getProviderDetail?emailId='+emailId);
  }
  getProviderbyCategory(category:string){
    return this.http.get<ProvidersModel[]>('http://localhost:8080/getProviderbyCategory?category='+category);
  }

  getPosts(id:string){
    return this.http.get<ProvidersPosts[]>('http://localhost:8080/getPost?id='+id);
  }

  uploadPost(data:ProvidersPosts){
    return this.http.post<ProvidersPosts[]>('http://localhost:8080/uploadPost',data)
  }
  deletePost(data:ProvidersPosts){
    const requestOptions: Object = {
      responseType: 'text'
    }
    return this.http.post<String>('http://localhost:8080/deletePost',data,requestOptions)
  }
  updateSkills(data:ProvidersSkillsModel[]){
    const requestOptions: Object = {
      responseType: 'text'
    }
    return this.http.post<string>('http://localhost:8080/updateSkills',data,requestOptions);
  }
  getSkills(id:string){
    return this.http.get<ProvidersSkillsModel[]>('http://localhost:8080/getSkills?id='+id);
  }
  /*-------------    SERVICES      ----------------*/

  getUserDetails(id:string){
    return this.http.get<UsersModel>('http://localhost:8080/getUserDetails?id='+id)
  }
  getStates(){
    return this.http.get<string[]>('http://localhost:8080/getStates');
  }
  getCities(state:string){
    return this.http.get<string[]>('http://localhost:8080/getCities?state='+state);
  }
  getCategory(){
    return this.http.get<CategoryModel[]>('http://localhost:8080/getCategory');
  }
  getSubCategory(cat:string){
    return this.http.get<string[]>('http://localhost:8080/getSubCategory?category='+cat);
  }
  getFeaturedCategory(){
    return this.http.get<CategoryModel[]>('http://localhost:8080/getFeaturedCategory');
  }

  /*-------------    REQUESTS      ----------------*/

  saveRequest(requestdata:RequestModel){
    const requestOptions: Object = {
      responseType: 'text'
    }
    return this.http.post<string>('http://localhost:8080/saveRequest',requestdata,requestOptions);
  }
  getRequest(emailid){
    return this.http.get<RequestModel[]>('http://localhost:8080/getRequest?id='+emailid);
  }
  getRequestToId(emailid){
    return this.http.get<RequestModel[]>('http://localhost:8080/getRequestToId?id='+emailid);
  }
  updateRequestStatus(requestdata:RequestModel){    
    const requestOptions: Object = {
      responseType: 'text'
    }
    return this.http.post<string>('http://localhost:8080/updateRequestStatus',requestdata,requestOptions);
  }


  /*-------------    FEEDBACK      ----------------*/

  getFeedbackFromId(id:string){
    return this.http.get<FeedbackModel[]>('http://localhost:8080/getFeedbackFromId?id='+id);
  }  
  getFeedbackToId(id:string){
    return this.http.get<FeedbackModel[]>('http://localhost:8080/getFeedbackToId?id='+id);
  }
  saveFeedback(feedbackdata:FeedbackModel){    
    const requestOptions: Object = {
      responseType: 'text'
    }
    return this.http.post<string>('http://localhost:8080/saveFeedback',feedbackdata,requestOptions);
  }  
  getFeedback(fromId,toId){
    return this.http.get<boolean>('http://localhost:8080/getFeedback?fromId='+fromId+'&toId='+toId);
  }
  
  /*-------------    CHATS      ----------------*/
  chatlist(id:string){
    return this.http.get<UsersModel[]>('http://localhost:8080/getChatUsers?id='+id);
   };
  chats(chat:MessageModel){    
    return this.http.post<MessageModel[]>('http://localhost:8080/chatdetail',chat)
    // pipe(
    //   tap(data=>this.chatserv.updatemessages(data))
    //   ) ;
  }  

  /*-------------    IMAGE SAVING      ----------------*/
  
  saveImage(uploadData){
  return this.http.post('http://localhost:8080/upload', uploadData);
  }
  getImage(name){
    return this.http.get('http://localhost:8080/getImage?name='+name);
  }

}
