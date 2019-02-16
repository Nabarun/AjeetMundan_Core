import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage({
  name: 'checkin-thanks'
})
@Component({
  selector: 'page-checkinthanks',
  templateUrl: 'checkin-thanks.html'
})
export class CheckinThanks {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {}

  closeThankyou() {
    this.navCtrl.pop();
  }

}
