import { Component, Input, OnInit } from '@angular/core';
import { ProvidersModel } from 'src/app/Models/providers.model';
import { ProvidersSkillsModel } from 'src/app/Models/providersSkill.model';
import { Dataservice } from 'src/app/Services/dataservice.service';

@Component({
  selector: 'app-aboutme',
  templateUrl: './aboutme.component.html',
  styleUrls: ['./aboutme.component.scss'],
})
export class AboutmeComponent implements OnInit {

  @Input() id:string;
  @Input() description:string;
  loader:boolean=true;
  msgFlag:boolean;
  providerskillsArray:ProvidersSkillsModel[];
  constructor(public dataServ:Dataservice) { }

  ngOnInit() {}
    ngOnChanges() {
      this.dataServ.getSkills(this.id).subscribe(data=>{
        this.loader=false;
        this.providerskillsArray=data;
        console.log("about me:"+this.providerskillsArray[0])
        if(this.providerskillsArray[0]!=null){
          console.log("about me:"+this.providerskillsArray[0])
          this.msgFlag=false;
        }else{
          this.msgFlag=true;
        }
      });
    }
  

}
