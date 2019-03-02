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
import {ServicedbService} from '../service/servicedb.service';
import {DealsService} from '../deals/deals.service';
import {Deals} from "../deals/deals.model";
import {PushService} from '../../app/push.service';
import {AngularFireAuth} from 'angularfire2/auth';
import {AuthService} from '../providers/auth.service';
import {User} from "../../models/user";
import {Appointment} from "./appointment.model";


@IonicPage({
    name: 'appointment',
    defaultHistory: ['home']
})
@Component({
    selector: 'page-appointment',
    templateUrl: 'appointment.html'
})
export class AppointmentPage{
    error: string;
    callback: () => void;
    gplus: any;
    appoForm: FormGroup;
    services: any = this._dbservice.all();
    deal: Observable<Deals> = this._dealdb.dealgrab$;
    singleDeal: Deals;
    currentUid: any;
    currentUname: string;
    currentEmail: string;
    isLoggedIn: any;
    user = {} as User;
    dayValues: string[];
    monthValues: string[];
    todaysAppt: Observable<Appointment[]>;
    serviceSelected: any;
    hourValues: any;

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

        this.dayValues = new Array();
        this.monthValues = new Array();
        this.hourValues = new Array(9, 10, 11, 12, 13, 14, 15, 16, 17, 18);

        this.currentEmail ="";
        this.currentUname="";
        this.serviceSelected = new Array();
    }

    ngOnInit() {

        /*this.afAuth.authState.subscribe( user => {
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
                this.getAllAppointmentDays();
            }else{
                this.currentUid=null;
            }
        });*/
    }

    /*createForm() {
        const currentDate = new Date();
        //If it is Tuesday then assign it to Wednesday as Tuesday is closed
        //If it is a Friday or weekend get next Monday
        if(currentDate.getDay() == 2){
            currentDate.setDate(currentDate.getDate() + 1);
        } else if(currentDate.getDay() == 5){
            currentDate.setDate(currentDate.getDate() + 3);
        } else if(currentDate.getDay() == 6){
            currentDate.setDate(currentDate.getDate() + 2);
        } else if(currentDate.getDay() == 0){
            currentDate.setDate(currentDate.getDate() + 1);
        }

        let hours = 0;
        let minutes = 0;

        if(currentDate.getHours() > 18 || currentDate.getHours() < 9){
            hours = 9;
            minutes =0;
        } else {
            hours = currentDate.getHours();
            minutes = currentDate.getMinutes();
        }
        const defaultTime = {
            appointTime: `${this.paddedZero(hours)}:${this.paddedZero(minutes)}`,
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

    async saveFormData(appForm: any) {
        let date = new Date(appForm.appointDate);
        let utcDate = new Date(date.toUTCString());
        utcDate.setHours(utcDate.getHours() + 14);

        appForm.date =this.fixStartDateTime(appForm.appointTime, utcDate.toDateString()).toLocaleDateString();
        appForm.starttime = this.fixStartDateTime(appForm.appointTime, appForm.date).toLocaleTimeString('en-GB');
        appForm.endtime = this.fixEndDateTime(appForm.appointTime, appForm.date, appForm.service.length).toLocaleTimeString('en-GB');
        //
        let startDate = new Date(appForm.date);
        let bookingStartTime = new Date(this.fixStartDateTime(appForm.starttime, appForm.date));
        let bookingEndTime = new Date(this.fixStartDateTime(appForm.endtime, appForm.date));
        this.todaysAppt = this._db.showAppointmentForThisDate(startDate.toLocaleDateString());
        let appt = new Promise((resolve, reject) => {
            //Tuesday : Closed
            //Friday, Saturday and Sunday : Walkin
            if(startDate.getDay() != 5 && startDate.getDay() !=6 && startDate.getDay() != 0 && startDate.getDay() != 2) {
                this.todaysAppt.subscribe((appts) => {
                    appts = appts.reverse();
                    this.validateTimeSlot(appts, appForm.date, bookingStartTime, bookingEndTime).then((resp) => {
                        resolve(resp)
                    });
                });
            } else {
                resolve(false);
            }
        });

        appt.then((resp) => {
            if (resp) {
                delete appForm.appointTime;
                delete appForm.appointDate;

                this._db.save(appForm).then((res) => {
                    this.presentModal();

                    const currentDate = new Date();
                    const defaultTime = {
                        appointTime: `${this.paddedZero(currentDate.getHours())}:${this.paddedZero(currentDate.getMinutes())}`,
                        appointDate: `${currentDate.getFullYear()}-${this.paddedZero(currentDate.getUTCMonth() + 1)}-${this.paddedZero(currentDate.getDate())}`
                    }

                    this.appoForm.reset({
                        appointTime: defaultTime.appointTime,
                        appointDate: defaultTime.appointDate
                    });
                    this._dealdb.updateDealgrab(null);
                });
            } else {
                if(startDate.getDay() == 5 || startDate.getDay() ==6 || startDate.getDay() == 0 || startDate.getDay() == 2){
                    const alert = this.alertCtrl.create({
                        title: 'Booking Appointment Disabled',
                        subTitle: 'You cannot book appointment on Tuesday, Friday, Saturday and Sunday',
                        buttons: ['Ok']
                    });
                    alert.present();
                } else {
                    let alert = this.alertCtrl.create({
                        title: 'Already Booked',
                        subTitle: "It seems someone has already booked during this time. Please call Ajeet to set up an appointment.",
                        buttons: ['OK']
                    });
                    alert.present();
                }
            }
        });

    }

    validateTimeSlot(appts: any, date: string, bookingStartTime: Date, bookingEndTime: Date){
        return new Promise((resolve, reject) =>{
            let resp = true;
            for(let loop=0; loop< appts.length; loop++) {
                let apptObj = appts[loop];
                let existingStartTime = new Date(this.fixStartDateTime(apptObj.starttime, date));
                let existingEndTime = new Date(this.fixStartDateTime(apptObj.endtime, date));
                if (bookingEndTime > existingStartTime && bookingEndTime <= existingEndTime) {
                    resp = false;
                    break;
                } else if (bookingStartTime >= existingStartTime && bookingStartTime < existingEndTime) {
                    resp = false;
                    break;
                } else if (bookingStartTime <= existingStartTime && bookingEndTime >= existingEndTime) {
                    resp = false;
                    break;
                }
            }

            resolve(resp);
        });
    }

    fixStartDateTime(timeString: string, dateString: string): Date {
        const bookingTimeString = timeString.split(':');
        const bookingDate = new Date(dateString);
        let temp = bookingDate.setHours(parseInt(bookingTimeString[0]));
        temp = bookingDate.setMinutes(parseInt(bookingTimeString[1]));
        return new Date(temp);
    }

    fixEndDateTime(timeString: string, dateString: string, serviceCount: number): Date {
        const endBookingTimeString = timeString.split(":");
        const endBookingDate = new Date(dateString);
        let hour = parseInt(endBookingTimeString[0]);
        let minutes = parseInt(endBookingTimeString[1]) + 20 * serviceCount;

        if(minutes > 60){
            hour = hour + 1;
            minutes = minutes - 60;
        }

        let temp = endBookingDate.setHours(hour);
        temp = endBookingDate.setMinutes(minutes);

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

    /!**
     * Get all days apart from Friday, Saturday and Sunday
     *!/
    getAllAppointmentDays(){
        function nextDay(date) {
            return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
        }

        var current = new Date(),
            year = current.getFullYear(),
            nextMonth = current.getMonth()+1,
            weekEndDate = current.getDate()+30;

        while(current.getFullYear() === year && current.getMonth() <= nextMonth && current.getDate() <= weekEndDate)  {
            //Tuesday : Closed
            //Friday, Saturday and Sunday : Walkin
            if(current.getDay() != 5 && current.getDay() !=6 && current.getDay() != 0 && current.getDay() != 2) {
                this.dayValues.push(current.getDate().toLocaleString())
            }
            current = nextDay(current);
        }
    }

    async doLogin(){
        try{
            this.afAuth.auth.signInWithEmailAndPassword(this.user.email, this.user.password).then(auth => {
                this.afAuth.authState.subscribe( user => {
                    this.currentUid = user.uid;
                    this.currentEmail = user.email;
                    this.currentUname = user.displayName;
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

    doRegister(){
        this.navCtrl.push('RegisterPage');
    }

    selectedServices($event): void {
        this.serviceSelected.length = 0;
        $event.forEach((service) => {
           this.serviceSelected.push(service);
        });
    }*/
}
