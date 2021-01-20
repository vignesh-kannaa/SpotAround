import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Dataservice } from 'src/app/Services/dataservice.service';
import { ProvidersModel } from 'src/app/Models/providers.model';
import { ModalController } from '@ionic/angular';
import { FilterModalComponent } from './filter-modal/filter-modal.component';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.page.html',
  styleUrls: ['./service-list.page.scss'],
})
export class ServiceListPage implements OnInit {

  msgFlag:boolean;
  loader:boolean=true;
  servicelist:ProvidersModel[];
  filterservice=[];
  category:string;
  constructor(private dataServ:Dataservice, 
    private activeroute:ActivatedRoute,
    private router:Router,
    public modalController: ModalController) { }

  ngOnInit() {
    this.activeroute.paramMap.subscribe((paramMap)=>{
      this.category=paramMap.get('category');
      this.dataServ.getProviderbyCategory(this.category).subscribe(data=>{
        this.loader=false;
        this.servicelist=data;
        this.filterservice=this.servicelist;
        if(this.filterservice[0]!=null){
          this.msgFlag=false;
        }
        else {
          this.msgFlag=true;
        }
      });
 });
}
  
  initializeItems() {
    this.filterservice=this.servicelist;
   
   }
 
   getItems(ev:any){
     this.initializeItems();
     const val = ev.target.value;
     if (val && val.trim() != '') {
       this.filterservice = this.servicelist.filter((item) => {
         return ((item.firstName+item.lastName).toLowerCase().indexOf(val.toLowerCase()) > -1);
       })
     }
   }

   onFilter(){
    this.filterModal();
   }

   async filterModal() {
    this.modalController.create({
      component: FilterModalComponent,
      cssClass: 'hireRequestmodal'
    }).then(modalEl=>{
      modalEl.present();
      return modalEl.onDidDismiss();
    }).then(result=>{
      if(result.data==''){
        
      }else if(result.data==='reset'){
        this.filterservice=this.servicelist;
      }else if(result.data!=='reset'){
        this.filterservice = this.servicelist.filter((item) => {
          return item.city==result.data;
        });
        }
      
      })
    }
  
   servdetail(id:string){
    this.router.navigate(['/','tabs','home','service-detail',id]);
   }
   message(id){
     this.router.navigate(['/','tabs','message','chat',id]);
   }

}
