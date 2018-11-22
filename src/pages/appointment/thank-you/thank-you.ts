import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage({
  name: 'thank-you'
})
@Component({
  selector: 'page-thank-you',
  templateUrl: 'thank-you.html'
})
export class ThankYouPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {}

  closeThankyou() {
    this.navCtrl.pop();
  }

}
