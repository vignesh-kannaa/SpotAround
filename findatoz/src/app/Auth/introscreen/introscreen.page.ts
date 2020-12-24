import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-introscreen',
  templateUrl: './introscreen.page.html',
  styleUrls: ['./introscreen.page.scss'],
})
export class IntroscreenPage implements OnInit {

  constructor(public router:Router) { }
  @ViewChild('mySlider')  slides: IonSlides;
  lastSlide:boolean=false;

  swipeNext(){
    this.slides.slideNext();
  }
  ngOnInit() {
  }
  onContinue(){
    this.router.navigate(['/','tabs','home'])
  }
  onLast(){
    this.lastSlide=true;
  }

}
