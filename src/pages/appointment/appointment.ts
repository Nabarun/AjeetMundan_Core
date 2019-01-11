import {Component, ViewChild} from '@angular/core';
import {
    AlertController,
    Events,
    IonicPage,
    MenuController,
    ModalController,
    Navbar,
    NavController,
    Platform
} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from "rxjs/Observable";

import {AppointmentService} from './appointment.service';
import {ServicedbService} from '../service/servicedb.service';
import {DealsService} from '../deals/deals.service';
import {Deals} from "../deals/deals.model";
import {PushService} from '../../app/push.service';
import {AngularFireAuth} from 'angularfire2/auth';
import {AuthService} from '../providers/auth.service';
import {User} from "../../models/user";
import {HomePage} from "../home/home";

@IonicPage({
    name: 'appointment',
    defaultHistory: ['home']
})
@Component({
    selector: 'page-appointment',
    templateUrl: 'appointment.html'
})
export class AppointmentPage{
    gplus: any;
    appoForm: FormGroup;
    services: any = this._dbservice.all();
    deal: Observable<Deals> = this._dealdb.dealgrab$;
    singleDeal: Deals;
    currentUid: any;
    isLoggedIn: any;
    user = {} as User;
    constructor(public fb: FormBuilder,
                public modalCtrl: ModalController,
                public menuCtrl: MenuController,
                private _db: AppointmentService,
                private _dbservice: ServicedbService,
                private _dealdb: DealsService,
                public alertCtrl: AlertController,
                private pushservice: PushService,
                private afAuth: AngularFireAuth,
                private platform: Platform,
                public navCtrl: NavController,
                public events: Events) {

    }

    ngOnInit() {

        this.afAuth.authState.subscribe( user => {
            if (user) {
                this.currentUid = user.uid;
                this.createForm();
                this.deal.subscribe(res => {
                    if (res) {
                        this.appoForm.patchValue({
                            addedDeal: res.$key
                        });
                    }
                    this.singleDeal = res;
                });

                if (this.pushservice.uuid) {
                    this.appoForm.controls['uid'].patchValue(this.pushservice.uuid);
                }
            }else{
                this.currentUid=null;
            }
        });

    }


    @ViewChild(Navbar) navBar: Navbar;
    clickBackButton() {
        this.navCtrl.setPages([{page: HomePage}]);
    }

    createForm() {
        const currentDate = new Date();
        const defaultTime = {
            appointTime: `${this.paddedZero(currentDate.getHours())}:${this.paddedZero(currentDate.getMinutes())}`,
            appointDate: `${currentDate.getFullYear()}-${this.paddedZero(currentDate.getUTCMonth() + 1)}-${this.paddedZero(currentDate.getDate())}`
        }

        this.appoForm = this.fb.group({

            name: ['', Validators.required],
            phone: ['', Validators.required],
            email: ['', Validators.compose([Validators.required, Validators.email])],
            appointTime: [defaultTime.appointTime, Validators.required],
            appointDate: [defaultTime.appointDate, Validators.required],
            service: ['', Validators.required],
            notes: [''],
            status: ['pending'],
            addedDeal: [''],
            uid: [this.currentUid]
        });
    }

    paddedZero(number) {
        return number < 10 ? '0' + number : number
    }

    showErrorAlert(msg: string) {
        let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: msg,
            buttons: ['OK']
        });
        alert.present();
    }

    saveFormData(appForm: any): void {
        appForm.date = this.fixDateTime(appForm.appointTime, appForm.appointDate).toString();
        delete appForm.appointTime;
        delete appForm.appointDate;
        this._db.save(appForm).then((res) => {
            this.presentModal();
            this.appoForm.reset();
            this._dealdb.updateDealgrab(null);
        });
    }

    fixDateTime(timeString: string, dateString: string): Date {
        const bookingTime = timeString.split(':');
        const bookingDate = new Date(dateString);
        let temp = bookingDate.setHours(parseInt(bookingTime[0]));
        temp = bookingDate.setMinutes(parseInt(bookingTime[1]));
        return new Date(temp);
    }

    formSubmit(value: any, valid): void {
        if (valid && this.currentUid) {
            value.uid= this.currentUid;
            this.saveFormData(value);
        } else {
            this.showErrorAlert('Form validation error');
        }
    }

    presentModal() {
        let modal = this.modalCtrl.create('thank-you');
        modal.present();
    }

    openMenu() {
        let menu = this.menuCtrl;
        setTimeout(function () {
            menu.open();
        }, 200);
    }

    register(){
        this.navCtrl.push('RegisterPage');
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
                this.createForm();
            })
            .catch(error => console.log(error));
    }
}
