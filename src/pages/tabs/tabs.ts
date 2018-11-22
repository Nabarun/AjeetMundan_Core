import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HomePage} from "../home/home";
import {AppointmentPage} from "../appointment/appointment";
import {LoginPage} from "../login/login";
import {ServicedbService} from "../service/servicedb.service";
import {DealsPage} from "../deals/deals";
import {AngularFireAuth} from "angularfire2/auth";

/**
 * Generated class for the TabsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name: 'tabs'
})
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tabOne: any;
  tabTwo: any;
  tabThree: any;
  servicescats: any = [];

  constructor(private _dbservice: ServicedbService) {
    this.tabOne = HomePage;
    this.tabTwo = AppointmentPage;
    this.tabThree = DealsPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

  ngOnInit() {
    this._dbservice.allcats().subscribe(res => {
      this.servicescats = res;
    });
  }
}
