import { Component, Input, OnInit } from '@angular/core';
import { CategoryModel } from 'src/app/Models/category.model';
import { Dataservice } from 'src/app/Services/dataservice.service';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  msgFlag:boolean;
  loader:boolean=true;
  filterData:CategoryModel[]=[];
  categories:CategoryModel[]=[];
  constructor(private dataServ:Dataservice) { }

  ngOnInit() {
    this.dataServ.getCategory().subscribe(data=>{
      this.loader=false;
      this.categories=data;
     
      this.filterData=this.categories;
      if(this.filterData[0]!=null){
       
        this.msgFlag=false;
      }
    })
  }

// initializeItems() {
//  this.filterData=this.categories;
 
// }

// getItems(ev:any){
//   this.initializeItems();
//   const val = ev.target.value;
//   if (val && val.trim() != '') {
//     this.filterData = this.categories.filter((item) => {
//       return (item.subCategory.toLowerCase().indexOf(val.toLowerCase()) > -1);
//     })
//   }
// }
}
