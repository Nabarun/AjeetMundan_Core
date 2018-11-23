import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';


import { Appointment } from './appointment.model';

@Injectable()
export class AppointmentService {

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
}
