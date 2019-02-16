import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import {Appointment} from "../appointment/appointment.model";



@Injectable()
export class CheckinService {

    constructor(private af: AngularFireDatabase) { }

    /**
     * Appointment
     */
    appointments : FirebaseListObservable<Appointment[]> = this.af.list('appointments', { preserveSnapshot: true });

    /**
     * Create new appointment
     */
    save(content: Appointment) {
        return this.appointments.push(content);
    }

    showAppointmentForThisDate(date: string): FirebaseListObservable<Appointment[]>{
        return this.af.list('appointments', {
            preserveSnapshot: true,
            query: {
                orderByChild: 'date',
                equalTo: date
            }
        });
    }

}
