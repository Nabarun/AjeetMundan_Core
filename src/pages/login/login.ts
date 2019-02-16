import { Component } from '@angular/core';
import { IonicPage, AlertController, NavController, NavParams } from 'ionic-angular';
import {User} from "../../models/user";
import {AngularFireAuth} from "angularfire2/auth";
import {AuthProvider} from "../../providers/auth/auth";
import {AppointmentPage} from "../appointment/appointment";


/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {
    title : any;
    error : String;

    user = {} as User;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public afAuth: AngularFireAuth,
        public authProvider: AuthProvider,
        public alertCtrl: AlertController) {
        this.title = "Login";
    }

    ngOnInit(){
        this.afAuth.authState.subscribe( user => {
            if(user){
                this.navCtrl.push(AppointmentPage);
            }
        });
    }

    async doLogin(){
        try{
            this.afAuth.auth.signInWithEmailAndPassword(this.user.email, this.user.password).then(auth => {
                this.navCtrl.push(AppointmentPage);
            }).catch(err => {
                this.error =  err.message;
            });

        }
        catch(e){
            console.error(e);
        }
    }

    async passwordReset(){
        try{
            let alert = this.alertCtrl.create({
                title: 'Reset Password',
                subTitle: 'An email with the password reset link will be sent to the email address you enter.',
                inputs: [
                    {
                        name: 'email',
                        placeholder: 'Email'
                    }
                ],
                buttons: [
                    {
                        text: 'Dismiss'
                    },
                    {
                        text: 'Submit',
                        handler: resp => {
                            if (!resp) {
                                return;
                            }

                            this.afAuth.auth.sendPasswordResetEmail(resp.email).then(response => {
                                let confirmAlert = this.alertCtrl.create({
                                    title: 'Email Sent',
                                    subTitle: 'Email has been successfully sent. Please click the link and reset your password.',
                                    buttons: [{
                                        text: 'Dismiss'
                                    }]
                                });

                                confirmAlert.present();
                            }).catch((err) => {

                                alert.dismiss();
                            });

                        }
                    }
                ]
            });

            alert.present();
        } catch(e){

        }
    }

    doRegister(){
        this.navCtrl.push('RegisterPage');
    }

}


