
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryModel } from 'src/app/Models/category.model';
import { Dataservice } from 'src/app/Services/dataservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

msgFlag:boolean;
loader:boolean=true;
searchTerm:String='';
items:CategoryModel[]=[];
filterData=[];
  constructor(private router:Router,
    private dataServ:Dataservice
) { }

  ngOnInit() {
    
    this.dataServ.getFeaturedCategory().subscribe(data=>{
       this.loader=false;
        this.items=data;
        this.filterData=this.items;
        if(this.filterData[0]!=null){
          this.msgFlag=false;
        }else {
          this.msgFlag=true;
        }
    }
      );
   
  }
  initializeItems() {
   this.filterData=this.items;
  }

  getItems(ev:any){
    this.initializeItems();
    const val = ev.target.value;
    if (val && val.trim() != '') {
      this.filterData = this.items.filter((item) => {
        return (item.subCategory.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
  loadlist(id:string){
    
    this.router.navigate(['/','tabs','home','service-list',id])
  }
  toCategory(){
    this.router.navigate(['/','tabs','categories'])
  }
  
}
