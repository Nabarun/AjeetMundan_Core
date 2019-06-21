import {Component} from '@angular/core';
import {
    IonicPage,
} from 'ionic-angular';
import {AuthService} from '../providers/auth.service';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';

@IonicPage({
    name: 'appointment',
    defaultHistory: ['home']
})
@Component({
    selector: 'page-appointment',
    templateUrl: 'appointment.html'
})
export class AppointmentPage{
    iabBrowser: any;

    constructor(
                private iab: InAppBrowser) {

        this.iabBrowser = iab;
    }

    ngOnInit() {

        const browser = this.iabBrowser.create('http://ajeetpal.appointy.com/?isGadget=1','_blank', 'location=yes');
        browser.show();
    }



    public closeKeyboard() {
        alert("keyboard open");
    }
}
