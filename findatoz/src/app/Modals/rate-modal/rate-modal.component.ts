import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { FeedbackModel } from 'src/app/Models/feedback.model';
import { RequestModel } from 'src/app/Models/RequestModel';
import { Dataservice } from 'src/app/Services/dataservice.service';

@Component({
  selector: 'app-rate-modal',
  templateUrl: './rate-modal.component.html',
  styleUrls: ['./rate-modal.component.scss'],
})
export class RateModalComponent implements OnInit {
  @Input() requestdetail:RequestModel;

  rate:number=0;
  review:string;
  constructor(private modalController:ModalController,
              private dataserv:Dataservice ) { }

  ngOnInit() {}

  onSubmit(){
    const feedback=new FeedbackModel(this.requestdetail.fromId,
                                      this.requestdetail.toId,
                                      this.review,this.rate);
    this.dataserv.saveFeedback(feedback).subscribe(data=>{
      console.log("rating"+data);
    });
    this.modalController.dismiss();                        
  }

  onModelChange(ev){
   this.rate=ev;
  }

onClose(){
this.modalController.dismiss();
}


}
