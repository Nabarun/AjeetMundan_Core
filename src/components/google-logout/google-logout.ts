import { Component } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { GooglePlus } from '@ionic-native/google-plus';
import { Platform } from 'ionic-angular';

/**
 * Generated class for the GoogleLoginComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'google-logout',
  templateUrl: 'google-logout.html'
})
export class GoogleLogoutComponent {
  gplus: any;
  isGoogleLogout: boolean = true;
  public user: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth,
              private platform: Platform) {
    this.user = this.afAuth.authState;

  }

  googleLogout(){
    if(this.platform.is('cordova')){
      this.nativeGoogleLogout();
    } else {
      this.webGoogleLogout();
    }
  }

  async nativeGoogleLogout(): Promise<void> {
    try{
      const gplusUser = await this.gplus.login({
        'webClientId': '90387673353-8ua61ko34o27g2jut8qmq1m7sa8pvhhd.apps.googleusercontent.com',
        'offline': true,
        'scopes': 'profile email'
      })

      return await this.afAuth.auth.signInWithCredential(
        firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken)
      )
    } catch(err){
      console.log(err);
      this.isGoogleLogout = false;
    }
  }

  async webGoogleLogout(): Promise<void> {
    try{
      const provider = new firebase.auth.GoogleAuthProvider();
      await this.afAuth.auth.signInWithPopup(provider);
    }catch(err){
      console.log(err);
      this.isGoogleLogout = false;
    }
  }

  signOut() {
    this.afAuth.auth.signOut();
    if(this.platform.is('cordova')){
      this.gplus.logout();
      this.isGoogleLogout = false;
    }
  }
}
