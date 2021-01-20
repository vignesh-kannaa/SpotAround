import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
const { Share } = Plugins;

@Component({
  selector: 'app-profile-options',
  templateUrl: './profile-options.component.html',
  styleUrls: ['./profile-options.component.scss'],
})
export class ProfileOptionsComponent implements OnInit {

  constructor() { }

  ngOnInit() {}
  async onShare(){
    await Share.share({
      title: 'SpotAround',
      url: 'https://play.google.com/store/apps/details?id=com.spotaround',
      dialogTitle: 'Share with customers'
    });
  }
}
