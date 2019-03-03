import {Component, OnInit} from '@angular/core';
import {IonicPage, ModalController, NavController, AlertController, Events,} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from "rxjs";
import {Appointment} from "../appointment/appointment.model";
import {AppointmentService} from "../appointment/appointment.service";
import {ServicedbService} from "../service/servicedb.service";
import {CheckinService} from "./checkin.service";

/**
 * Generated class for the Checkin  page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'checkin',
    templateUrl: 'checkin.html',
})
export class CheckinPage implements OnInit{

    checkinForm: FormGroup;
    waittime: string;
    services: any = this._dbservice.all();
    todaysAppt: Observable<Appointment[]>;
    serviceSelected: any;
    activate: any;
    constructor(public fb: FormBuilder,
                public navCtrl: NavController,
                public modalCtrl: ModalController,
                private _db: AppointmentService,
                private _dbservice: ServicedbService,
                private _dbcheckin: CheckinService,
                public alertCtrl: AlertController,
                public events: Events) {
        this.serviceSelected = new Array();
        this.activate = false;
    }


    ngOnInit() {
        this.createForm();
        this.activateCheckin();
    }

    createForm() {
        const currentDate = new Date();
        const defaultTime = {
            appointTime: `${this.paddedZero(currentDate.getHours())}:${this.paddedZero(currentDate.getMinutes())}`,
            appointDate: `${currentDate.getFullYear()}-${this.paddedZero(currentDate.getUTCMonth() + 1)}-${this.paddedZero(currentDate.getDate())}`
        }
        this.checkinForm = this.fb.group({

            name: ['', Validators.required],
            phone: ['', Validators.required],
            //email: ['', Validators.compose([Validators.required, Validators.email])],
            service: ['', Validators.required],
            appointTime: [defaultTime.appointTime],
            appointDate: [defaultTime.appointDate],
            uid: "Walkin",
            status: ['pending']
        });


    }

    async activateCheckin() {
        this.events.subscribe('walkin:created', (time) => {
            let date = new Date(time);
            if(date.getDay() == 5 || date.getDay() == 6 || date.getDay() == 0){
                this.getWalkinStatus().then((disable) => {
                    this.activate = !disable;
                });

            } else {
                this.activate = false
            }

        });
    }

    async setWaitTime(checkinForm: any){
        let date = new Date();
        checkinForm.date = this.fixStartDateTime(checkinForm.appointTime, date.toDateString()).toLocaleDateString();

        let startDate = new Date(checkinForm.date);

        let bookingStartTime = new Date(this.fixStartDateTime(date.toLocaleTimeString('en-GB'), checkinForm.date));
        let bookingEndTime = new Date(this.fixStartDateTime(date.toLocaleTimeString('en-GB'), checkinForm.date));
        this.todaysAppt = this._db.showAppointmentForThisDate(bookingStartTime.toLocaleDateString());

        let appt = new Promise((resolve, reject) => {
            this.todaysAppt.subscribe((appts) => {
                this.getwaitTime(appts, startDate.toLocaleDateString(), bookingStartTime, bookingEndTime).then((resp) => {
                    resolve(resp)
                });
            });
        });

        return appt;
    }

    async saveFormData(checkinForm: any) {
        let date = new Date();

        checkinForm.date =this.fixStartDateTime(checkinForm.appointTime, date.toDateString()).toLocaleDateString();
        checkinForm.status='pending';
        checkinForm.uid='Walkin';


        let bookingStartTime = new Date(this.fixStartDateTime(date.toLocaleTimeString('en-GB'), checkinForm.date));
        let bookingEndTime = new Date(this.fixEndDateTime(date.toLocaleTimeString('en-GB'), checkinForm.date, checkinForm.service.length));

        this.todaysAppt = this._db.showAppointmentForThisDate(checkinForm.date);
        let appt = new Promise((resolve, reject) => {
            this.todaysAppt.subscribe((appts) => {
                this.getwaitTime(appts, checkinForm.date, bookingStartTime, bookingEndTime).then((resp) => {
                    resolve(resp)
                });
            });
        });

        appt.then((wait)=> {
            delete checkinForm.appointTime;
            delete checkinForm.appointDate;
            if (wait[0] > 0) {
                 bookingStartTime.setMinutes(bookingStartTime.getMinutes() + Number(wait[0]));
                 bookingEndTime.setMinutes(bookingEndTime.getMinutes() + Number(wait[0]))
            }

            checkinForm.starttime = this.fixStartDateTime(bookingStartTime.toLocaleTimeString('en-GB'), checkinForm.date).toLocaleTimeString('en-GB');
            checkinForm.endtime = this.fixEndDateTime(bookingStartTime.toLocaleTimeString('en-GB'), checkinForm.date, checkinForm.service.length).toLocaleTimeString('en-GB');

            this.waittime += wait[0].toString()+" min";

            this._db.save(checkinForm).then((res) => {
                this.presentModal();

                const currentDate = new Date();
                const defaultTime = {
                    appointTime: `${this.paddedZero(currentDate.getHours())}:${this.paddedZero(currentDate.getMinutes())}`,
                    appointDate: `${currentDate.getFullYear()}-${this.paddedZero(currentDate.getUTCMonth() + 1)}-${this.paddedZero(currentDate.getDate())}`
                }

                this.checkinForm.reset({appointTime: defaultTime.appointTime, appointDate: defaultTime.appointDate});
                //this._dealdb.updateDealgrab(null);
            });


        });
        /**/


    }

    getwaitTime(appts: any, date: string, bookingStartTime: Date, bookingEndTime: Date){

        appts.sort((a,b) =>{
            let c = new Date(this.fixStartDateTime(a.starttime, a.date));

            let d = new Date(this.fixStartDateTime(b.starttime, b.date));

            return c.getTime() - d.getTime();
        });

        return new Promise((resolve, reject) =>{
            let persons = 0;
            let wait = 0;
            let diff = bookingEndTime.getTime() - bookingStartTime.getTime();
            for(let loop=0; loop< appts.length; loop++) {
                let apptObj = appts[loop];
                let existingStartTime = new Date(this.fixStartDateTime(apptObj.starttime, date));
                let existingEndTime = new Date(this.fixStartDateTime(apptObj.endtime, date));
                 if (bookingStartTime >= existingStartTime && bookingStartTime <= existingEndTime) {
                     wait += (existingEndTime.getTime() - bookingStartTime.getTime()) / 60000;
                     bookingStartTime = existingEndTime;
                     persons++;
                     bookingEndTime = new Date(bookingStartTime.getTime() + diff);
                 } else if (bookingEndTime >= existingStartTime && bookingEndTime <= existingEndTime) {
                     let existingdiff = existingEndTime.getTime()-existingStartTime.getTime();
                     wait += ((existingStartTime.getTime() - bookingStartTime.getTime()) + existingdiff)/60000;
                     bookingStartTime = existingEndTime;
                     persons++;
                     bookingEndTime = new Date(bookingStartTime.getTime() + diff);
                 } else if (bookingStartTime <= existingStartTime && bookingEndTime >= existingEndTime) {
                     let existingdiff = existingEndTime.getTime()-existingStartTime.getTime();
                     wait += ((existingStartTime.getTime() - bookingStartTime.getTime())+existingdiff) / 60000;
                     persons++;
                     bookingStartTime = existingEndTime;
                     bookingEndTime = new Date(bookingStartTime.getTime() + diff);
                 }
            }

            resolve([wait, persons]);
        });
    }

    validateTimeSlot(appts: any, date: string, bookingStartTime: Date, bookingEndTime: Date){

        return new Promise((resolve, reject) =>{
            let wait = 0;
            for(let loop=0; loop< appts.length; loop++) {
                let apptObj = appts[loop];
                let existingStartTime = new Date(this.fixStartDateTime(apptObj.starttime, date));
                let existingEndTime = new Date(this.fixStartDateTime(apptObj.endtime, date));
                if (bookingEndTime >= existingStartTime && bookingEndTime <= existingEndTime) {
                    wait = (existingEndTime.getTime() - bookingStartTime.getTime())/60000;
                    break;
                } else if (bookingStartTime >= existingStartTime && bookingStartTime <= existingEndTime) {
                    wait = (existingEndTime.getTime() - bookingStartTime.getTime())/60000;
                    break;
                } else if (bookingStartTime <= existingStartTime && bookingEndTime >= existingEndTime) {
                    wait = (existingEndTime.getTime() - bookingStartTime.getTime())/60000;
                    break;
                }
            }

            resolve(wait);
        });
    }


    formSubmit(value: any, valid): void {
        if (valid ) {
            let persons = "0";
            //this.saveFormData(value);
            this.setWaitTime(value).then((waittime) => {
                if(waittime[0] > 0){
                    persons = waittime[1];
                }

                this.showWaitTime(persons, value);
            });

        } else {
            this.showErrorAlert('Form validation error');
        }
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

    presentModal() {
        let modal = this.modalCtrl.create('checkin-thanks');
        modal.present();
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

    showWaitTime(persons: string, value: any) {
        const alert = this.alertCtrl.create({
            //title: 'You are after '+ persons+' customer/s', // This was tracking the number of people prior in the queue, Ajeet wanted to hide it
            title: 'Reminder call',
            subTitle: 'A reminder call will be made 15 min prior to your appointment, you are requested to come 5 min prior to the appointment. Failure in doing so will cancel your appointment',
            buttons: ['Cancel',
                {
                    text: 'Ok',
                    handler: () => {
                        this.saveFormData(value);
                    }
                }]
        });
        alert.present();
    }


    selectedServices($event): void {
        this.serviceSelected.length = 0;
        $event.forEach((service) => {
            this.serviceSelected.push(service);
        });
    }

    async getWalkinStatus(){
        return new Promise((resolve, reject) => {
            this._dbcheckin.getWalkinStatus(new Date().toLocaleDateString()).subscribe(res => {
                if(res && res[0]){
                    resolve(res[0].checkinstatus);
                } else {
                    resolve(false);
                }
            });
        });


    }
}
