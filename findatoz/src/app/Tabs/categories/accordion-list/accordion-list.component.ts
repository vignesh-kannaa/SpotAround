import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryModel } from 'src/app/Models/category.model';
import { Dataservice } from 'src/app/Services/dataservice.service';

@Component({
  selector: 'app-accordion-list',
  templateUrl: './accordion-list.component.html',
  styleUrls: ['./accordion-list.component.scss'],
})
export class AccordionListComponent implements OnInit,OnChanges {


  @Input()  title : string; 
  @Input() image :string;
  subCategory=[];
  
  
  constructor(public dataServ:Dataservice,
    private router:Router) { }

  ngOnInit() {
   
  }
  ngOnChanges() {
    this.dataServ.getSubCategory(this.title).subscribe(data=>{
      this.subCategory=data;
    })
  }
  public isMenuOpen : boolean = false;

  public toggleAccordion() : void
  {
    this.isMenuOpen = !this.isMenuOpen;
  }
  onSelect(index){
    this.router.navigate(['/','tabs','home','service-list',this.subCategory[index]])
  }

}
