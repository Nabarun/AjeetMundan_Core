import { Component, ViewChild } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { GooglePlus } from '@ionic-native/google-plus';
import {App, NavController, Platform} from 'ionic-angular';
import {HomePage} from "../../../pages/home/home";

/**
 * Generated class for the GoogleLoginComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
    selector: 'logout',
    templateUrl: 'logout.html',

})
export class LogoutComponent {
    gplus: any;
    fb: any;
    isLoggedin: boolean = true;
    userClickedLogout: boolean = false;
    public user: Observable<firebase.User>;

    @ViewChild('myNav') nav;

    constructor(private afAuth: AngularFireAuth,
                private platform: Platform,
                public app: App) {

        this.user = this.afAuth.authState;
    }

    logout() {
        this.userClickedLogout = true;
        this.afAuth.auth.signOut();
        if(this.platform.is('cordova')){
            if(this.gplus.isLoggedIn) {
                this.gplus.logout();
            }else if(this.fb.isLoggedIn){
                this.fb.logout();
            } else {
                this.afAuth.auth.signOut();
            }
            this.isLoggedin = false;
        }
    }
}