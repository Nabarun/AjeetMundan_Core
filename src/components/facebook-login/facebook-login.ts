import { Component } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { Platform } from 'ionic-angular';

/**
 * Generated class for the GooglLoginComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'facebook-login',
  templateUrl: 'facebook-login.html'
})
export class FacebookLoginComponent {
  public user: Observable<firebase.User>;
  isLoggedIn:boolean = false;
  users: any;

  constructor(private afAuth: AngularFireAuth,
              private platform: Platform,
              private fb: Facebook) {
    this.user = this.afAuth.authState;
    fb.getLoginStatus()
      .then(res => {
        if(res.status === "connect"){
          this.isLoggedIn=true;
        } else {
          this.isLoggedIn=false;
        }
      })
      .catch(e => console.log(e));

  }

  async login(): Promise<void> {
    let provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithRedirect(provider).then(()=> {
      firebase.auth().getRedirectResult().then((result) =>{
        console.log(JSON.stringify(result));
      }).catch(function(error){
        console.log('Error'+error);
      });
    });


  }

  getUserDetail(userId){
    this.fb.api("/"+userId+"/?fields=id,email,name,picture,gender", ["public_profile"])
      .then(res => {
        console.log(res);
        this.users = res;
      })
      .catch(e => {
        console.log(e);
      })
  }

  signOut() {
    this.afAuth.auth.signOut();
    this.fb.logout()
      .then(res => this.isLoggedIn = false)
      .catch(e => console.log(e));
  }
}
