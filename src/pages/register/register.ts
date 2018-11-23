import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import {User} from "../../models/user";
import {Firebase} from '@ionic-native/firebase';
import {FirebaseListObservable} from "angularfire2/database";
import {FirebaseProvider} from "../../providers/firebase/firebase";
import {AuthProvider} from "../../providers/auth/auth";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-register',
    templateUrl: 'register.html',
})
export class RegisterPage {

    user = {} as User;
    authState: any = null;
    appoForm: FormGroup;

    constructor(
        public fb: FormBuilder,
        private afAuth: AngularFireAuth,
        public navCtrl: NavController,
        public navParams: NavParams,
        public authProvider: AuthProvider,
        public firebaseProvider: FirebaseProvider,
        public formBuilder: FormBuilder) {
        this.afAuth.authState.subscribe((auth) => {
            this.authState = auth;
        });


    }

    ngOnInit(){
        this.appoForm = this.fb.group({
            email: ['',Validators.compose([Validators.required, Validators.email])],
            phone: ['', Validators.required],
            password: ['']
        });
    }

    async register(){
        debugger;
        if(this.appoForm.valid) {
            const newUser = this.authProvider.signup(this.appoForm.value);
            this.authState = newUser;
            this.addUser(newUser);

            this.navCtrl.push('AppointmentPage');
        }

    }

    private addUser(userObj) : void {
        var newUser = {
            uid: userObj.uid,
            email: this.user.email,
            phone: this.user.phone
        };

        this.firebaseProvider.addUser(newUser);

    }



}