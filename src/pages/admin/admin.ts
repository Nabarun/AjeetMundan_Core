import {Component, ViewChild} from '@angular/core';
import {
    AlertController,
    Events,
    IonicPage,
    MenuController,
    ModalController,
    NavController,
    Platform
} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from "rxjs/Observable";

import {AppointmentService} from './appointment.service';
import {PushService} from '../../app/push.service';
import {AngularFireAuth} from 'angularfire2/auth';
import {AuthService} from '../providers/auth.service';
import {User} from "../../models/user";
import {Appointment} from "../appointment/appointment.model";
import { Calendar } from '@ionic-native/calendar';
import {AdminService} from "./admin.service";
import {FirebaseProvider} from "../../providers/firebase/firebase";

@IonicPage({
    name: 'admin',
    defaultHistory: ['home']
})
@Component({
    selector: 'page-admin',
    templateUrl: 'admin.html'
})
export class AdminPage{
    title: any;
    error: string;
    callback: () => void;
    gplus: any;
    appoForm: FormGroup;
    currentUid: any;
    user = {} as User;
    dayValues: string[];
    monthValues: string[];
    todaysAppt: Observable<Appointment[]>;
    users: Observable<User[]>;
    serviceSelected: any;
    hourValues: any;
    userObj:any;
    disable: any;
    buttonLabel:any;
    userId: string;
    constructor(public fb: FormBuilder,
                public modalCtrl: ModalController,
                public menuCtrl: MenuController,
                private _db: AdminService,
                public alertCtrl: AlertController,
                private pushservice: PushService,
                private afAuth: AngularFireAuth,
                private platform: Platform,
                public navCtrl: NavController,
                public events: Events,
                public firebaseProvider: FirebaseProvider) {
            this.title = "Todays appt";
            this.userId = 'nWkoeXvkdzfUW8jLp2baOf9h16i2';
            this.disable = false;

    }

    ngOnInit() {
        debugger;
        this.getWalkinStatus().then((res) => {
            this.disable = res;
        });
        this.afAuth.authState.subscribe( user => {
            //TODO Store in some secret store
            if (user && user.uid == this.userId) {
                this.userObj = user;
                this.currentUid = user.uid;

                if (this.pushservice.uuid) {
                    this.appoForm.controls['uid'].patchValue(this.pushservice.uuid);
                }

                this.getAllAppointments();
            } else {
                this.currentUid=null;
            }
        });

        /*this.events.subscribe('checkin:disabled', (status) => {
            // user and time are the same arguments passed in `events.publish(user, time)`
            console.log('Welcome', status);

            this.enabledisableWalkin().then((res) =>{
                this.disable = res;
                if(res){
                    this.buttonLabel ="Enable Walkin";
                }else{
                    this.buttonLabel = "Disable Walkin";
                }
            })
        });*/
    }

    showErrorAlert(msg: string) {
        let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: msg,
            buttons: ['OK']
        });
        alert.present();
    }



    openMenu() {
        let menu = this.menuCtrl;
        setTimeout(function () {
            menu.open();
        }, 200);
    }


    //Signout from Google/Facebook/Anonymous
    signOut() {
        this.currentUid = null;
        this.afAuth.auth.signOut();
        if(this.platform.is('cordova')){
            if(this.gplus.isLoggedIn) {
                this.gplus.logout();
            }  else {
                this.afAuth.auth.signOut();
            }
        }
    }

    anonymousLogin() {
        return this.afAuth.auth.signInAnonymously()
            .then((user) => {
                this.afAuth.authState = user;
            })
            .catch(error => console.log(error));
    }

    async doLogin(){
        try{
            this.afAuth.auth.signInWithEmailAndPassword(this.user.email, this.user.password).then(auth => {
                this.afAuth.authState.subscribe( user => {
                    if (user && user.uid == this.userId) {
                        this.currentUid = user.uid;
                    }else{
                        this.error = "You are not having admin rights."
                        this.currentUid = null;
                    }
                });

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

    async getAllAppointments(){
        var startDate = new Date();
        this.todaysAppt =this._db.showAppointmentForThisDate(startDate.toLocaleDateString());
    }

    async fireDisableEnable(status){
        this.events.publish('checkin:disabled', status)

    }

    async disableWalkin() {
        this._db.getWalkinStatus(new Date().toLocaleDateString()).subscribe(res => {
            if(res){
                if(res[0]) {
                    this._db.updateCheckin(res[0].$key, true);
                    this.disable = true;
                }else{
                    this._db.insertCheckin(new Date().toLocaleDateString(), false);
                }
            }
        });
    }


    async getWalkinStatus(){

        return new Promise((resolve, reject) => {
            this._db.getWalkinStatus(new Date().toLocaleDateString()).subscribe(res => {
                if(res && res[0]){
                    resolve(res[0].checkinstatus);
                } else {
                    resolve(false);
                }
            });
        });


    }
}
