import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import {Appointment} from "../appointment/appointment.model";
import {User} from "../../models/user";
import {Checkin} from "../../models/checkin";

@Injectable()
export class AdminService {

    constructor(private af: AngularFireDatabase) {

    }

    /**
     * Appointment
     */
    appointments : FirebaseListObservable<Appointment[]> = this.af.list('appointments', { preserveSnapshot: true });

    users: FirebaseListObservable<User[]> = this.af.list('users', {preserveSnapshot: true});

    /**
     * Create new appointment
     */
    save(content: Appointment) {
        return this.appointments.push(content);
    }

    showAppointmentForThisDate(date: string): FirebaseListObservable<Appointment[]>{

        return this.af.list('appointments', {
            query: {
                orderByChild: 'date',
                equalTo: date
            }
        });
    }

    insertCheckin(date: string, status: boolean){
        this.af.list('checkin').push({'date': date, 'checkinstatus': status});
    }

    updateCheckin(key: string, status: boolean){

        this.af.object('/checkin/'+key).update({checkinstatus: status});
    }

    getWalkinStatus(date: string): FirebaseListObservable<Checkin[]>{

        return this.af.list('checkin', {
            query: {
                orderByChild: 'date',
                equalTo: date
            }
        });
    }

}
