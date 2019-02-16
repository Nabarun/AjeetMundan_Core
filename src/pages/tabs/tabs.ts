import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {HomePage} from "../home/home";
import {LoginPage} from "../login/login";
import { Events } from 'ionic-angular';
import {AppointmentPage} from "../appointment/appointment";
import {CheckinPage} from "../checkin/checkin";
import {AngularFireAuth} from "angularfire2/auth";
import {User} from "../../models/user";

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
  enable: boolean;
  error : String;
  user = {} as User;
  constructor(public afAuth: AngularFireAuth,
              public navCtrl: NavController,
              public events: Events
              ) {
    this.tabOne = HomePage;
    this.tabTwo = AppointmentPage;
    this.tabThree = CheckinPage;
  }


  ngOnInit() {
     this.enable = true;
  }

    async doLogin() {
        try {

            this.afAuth.auth.signInWithEmailAndPassword(this.user.email, this.user.password).then(auth => {
                this.navCtrl.push(LoginPage);
            }).catch(err => {
                this.error = err.message;
            });

        }
        catch (e) {
            console.error(e);
        }
    }

    verifyWalkinDates() {
        this.events.publish('walkin:created', Date.now());

    }

}
