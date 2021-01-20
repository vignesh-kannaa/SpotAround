import { Injectable } from '@angular/core';
import { LoginModel } from '../Models/login.model';
import {HttpClient} from '@angular/common/http';
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
    return this.http.post<UsersModel>('https://spotaround.herokuapp.com/signup',signup);
  }
  login(login:LoginModel){
    return this.http.post<UsersModel>('https://spotaround.herokuapp.com/login',login);
  }
  socialLogin(userdata:UsersModel){
    return this.http.post<UsersModel>('https://spotaround.herokuapp.com/socialLogin',userdata);
  }
  editusername(user:UsersModel){
    return this.http.post<UsersModel>('https://spotaround.herokuapp.com/editUserName',user)
  }
  changePassword(logindata:LoginModel,password:string){
    const requestOptions: Object = {
      responseType: 'text'
    }
    return this.http.post<string>('https://spotaround.herokuapp.com/changePassword?pass='+password,logindata,requestOptions);
  }
  checkUser(userId:string){
    return this.http.get<boolean>('https://spotaround.herokuapp.com/userCheck?userId='+userId);  
  }
  /*-------------    PROVIDERS      ----------------*/
   
  saveProviderDetail(providerData:ProvidersModel){
    const requestOptions: Object = {
      responseType: 'text'
    }
    return this.http.post<string>('https://spotaround.herokuapp.com/saveProviderDetail',providerData,requestOptions);
  }
  getProviderDetail(emailId:string){
    return this.http.get<ProvidersModel>('https://spotaround.herokuapp.com/getProviderDetail?emailId='+emailId);
  }
  getProviderbyCategory(category:string){
    return this.http.get<ProvidersModel[]>('https://spotaround.herokuapp.com/getProviderbyCategory?category='+category);
  }

  getPosts(id:string){
    return this.http.get<ProvidersPosts[]>('https://spotaround.herokuapp.com/getPost?id='+id);
  }

  uploadPost(data:ProvidersPosts){
    return this.http.post<ProvidersPosts[]>('https://spotaround.herokuapp.com/uploadPost',data)
  }
  deletePost(data:ProvidersPosts){
    const requestOptions: Object = {
      responseType: 'text'
    }
    return this.http.post<String>('https://spotaround.herokuapp.com/deletePost',data,requestOptions)
  }
  updateSkills(data:ProvidersSkillsModel[]){
    const requestOptions: Object = {
      responseType: 'text'
    }
    return this.http.post<string>('https://spotaround.herokuapp.com/updateSkills',data,requestOptions);
  }
  getSkills(id:string){
    return this.http.get<ProvidersSkillsModel[]>('https://spotaround.herokuapp.com/getSkills?id='+id);
  }
  /*-------------    SERVICES      ----------------*/

  getUserDetails(id:string){
    return this.http.get<UsersModel>('https://spotaround.herokuapp.com/getUserDetails?id='+id)
  }
  getCategory(){
    return this.http.get<CategoryModel[]>('https://spotaround.herokuapp.com/getCategory');
  }
  getSubCategory(cat:string){
    return this.http.get<string[]>('https://spotaround.herokuapp.com/getSubCategory?category='+cat);
  }
  getFeaturedCategory(){
    return this.http.get<CategoryModel[]>('https://spotaround.herokuapp.com/getFeaturedCategory')
  }

  /*-------------    REQUESTS      ----------------*/

  saveRequest(requestdata:RequestModel){
    const requestOptions: Object = {
      responseType: 'text'
    }
    return this.http.post<string>('https://spotaround.herokuapp.com/saveRequest',requestdata,requestOptions);
  }
  getRequest(emailid){
    return this.http.get<RequestModel[]>('https://spotaround.herokuapp.com/getRequest?id='+emailid);
  }
  getRequestToId(emailid){
    return this.http.get<RequestModel[]>('https://spotaround.herokuapp.com/getRequestToId?id='+emailid);
  }
  updateRequestStatus(requestdata:RequestModel){    
    const requestOptions: Object = {
      responseType: 'text'
    }
    return this.http.post<string>('https://spotaround.herokuapp.com/updateRequestStatus',requestdata,requestOptions);
  }


  /*-------------    FEEDBACK      ----------------*/

  getFeedbackFromId(id:string){
    return this.http.get<FeedbackModel[]>('https://spotaround.herokuapp.com/getFeedbackFromId?id='+id);
  }  
  getFeedbackToId(id:string){
    return this.http.get<FeedbackModel[]>('https://spotaround.herokuapp.com/getFeedbackToId?id='+id);
  }
  saveFeedback(feedbackdata:FeedbackModel){    
    const requestOptions: Object = {
      responseType: 'text'
    }
    return this.http.post<string>('https://spotaround.herokuapp.com/saveFeedback',feedbackdata,requestOptions);
  }  
  getFeedback(fromId,toId){
    return this.http.get<boolean>('https://spotaround.herokuapp.com/getFeedback?fromId='+fromId+'&toId='+toId);
  }
  
  /*-------------    CHATS      ----------------*/
  chatlist(id:string){
    return this.http.get<UsersModel[]>('https://spotaround.herokuapp.com/getChatUsers?id='+id);
   };
  chats(chat:MessageModel){    
    return this.http.post<MessageModel[]>('https://spotaround.herokuapp.com/chatdetail',chat)
    // pipe(
    //   tap(data=>this.chatserv.updatemessages(data))
    //   ) ;
  }  

  /*-------------    IMAGE SAVING      ----------------*/
  
  countImage(id){
    return this.http.get('https://spotaround.herokuapp.com/getPostCount?id='+id);
  }
  saveImage(uploadData){
  return this.http.post('https://spotaround.herokuapp.com/upload', uploadData);
  }
  getImage(name){
    return this.http.get('https://spotaround.herokuapp.com/getImage?name='+name);
  }

}
