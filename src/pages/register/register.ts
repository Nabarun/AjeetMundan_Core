import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import {User} from "../../models/user";
import {Firebase} from '@ionic-native/firebase';
import {FirebaseListObservable} from "angularfire2/database";
import {FirebaseProvider} from "../../providers/firebase/firebase";
import {AuthProvider} from "../../providers/auth/auth";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AppointmentPage} from "../appointment/appointment";

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

    authState: any = null;
    appoForm: FormGroup;
    error : String;

    constructor(
        public fb: FormBuilder,
        private afAuth: AngularFireAuth,
        public navCtrl: NavController,
        public navParams: NavParams,
        public authProvider: AuthProvider,
        public firebaseProvider: FirebaseProvider,
        private toastCtrl: ToastController) {
        this.afAuth.authState.subscribe((auth) => {
            this.authState = auth;
        });


    }

    ngOnInit(){
        this.appoForm = this.fb.group({
            email: ['',Validators.compose([Validators.required, Validators.email])],
            name: ['', Validators.required],
            password: ['']
        });
    }

    register(){
        var self= this;
        if(this.appoForm.valid) {
            this.afAuth.auth.createUserWithEmailAndPassword(this.appoForm.value.email, this.appoForm.value.password).then((newUser) => {
                this.authState = newUser;
                this.addUser(newUser);
                let active = this.navCtrl.getActive(); // or getByIndex(int) if you know it
                this.navCtrl.remove(active.index);
            }).catch(function(err){
                self.presentToast(err);
                if(self !== undefined) {
                    self.error = err.message;

                }
            });
        }

    }
    private addUser(userObj) : void {
        var newUser = {
            uid: userObj.uid,
            email: userObj.email,
            name: this.appoForm.value.name
        };

        this.firebaseProvider.addUser(newUser);
    }

    private presentToast(message) : void {
        let toast = this.toastCtrl.create({
            message: 'Registration failed ' + message,
            duration: 3000,
            position: 'top'
        });

        toast.present().catch(function (error) {
            console.log(error);
        });
    }

}