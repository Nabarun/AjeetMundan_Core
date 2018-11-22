import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'appointment-footer',
  templateUrl: 'appointment-footer.component.html'
})
export class AppointmentFooter {

  constructor(public navCtrl: NavController) {}

  openAppointment() {
    this.navCtrl.push('appointment');
  }

}
