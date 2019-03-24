import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler, Keyboard} from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { Push } from '@ionic-native/push';
import { Device } from '@ionic-native/device';
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireAuthModule } from 'angularfire2/auth';

import { MyApp } from './app.component';

import { config, firebaseConfig } from './config';
import { DealsService } from "../pages/deals/deals.service";
import { ServicedbService } from "../pages/service/servicedb.service";
import { PageService } from "../pages/page/page.service";
import { PushService } from './push.service';
import {HomePage} from "../pages/home/home";
import {HomeSlider} from "../components/home-slider/home-slider.component";
import {AppointmentPage} from "../pages/appointment/appointment";
import {AppointmentService} from "../pages/appointment/appointment.service";
import {DealsPage} from "../pages/deals/deals";
import {ContactPage} from "../pages/contact/contact";
import {ServiceModule} from "../pages/service/service.module";
import {DealCard} from "../components/deal-card/deal-card.component";
import {PageTitle} from "../components/page-title/page-title.component";
import {LoginPage} from "../pages/login/login";
import {Page} from "../pages/page/page";
import {GoogleLogoutComponent} from "../components/google-logout/google-logout";
import {LogoutComponent} from "../components/logout/logout";
import {HeaderLogo} from "../components/headerLogo/headerLogo";
import { AuthProvider } from '../providers/auth/auth';
import { FirebaseProvider } from '../providers/firebase/firebase';
import { HttpProvider } from '../providers/http/http';
import { HttpModule } from '@angular/http';
import {CheckinPage} from "../pages/checkin/checkin";
import {AdminPage} from "../pages/admin/admin";
import {AdminService} from "../pages/admin/admin.service";
import {CheckinService} from "../pages/checkin/checkin.service";


@NgModule({

    declarations: [
        MyApp,
        HomePage,
        HomeSlider,
        DealsPage,
        ContactPage,
        LoginPage,
        Page,
        DealCard,
        PageTitle,
        LogoutComponent,
        HeaderLogo,
        AppointmentPage,
        CheckinPage,
        AdminPage
    ],
    imports: [
        IonicModule.forRoot(MyApp, config),
        BrowserModule,
        AngularFireAuthModule,
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireDatabaseModule,
        ServiceModule,
        HttpModule
    ],
    bootstrap: [
        IonicApp
    ],
    entryComponents: [
        MyApp,
        HomePage,
        HomeSlider,
        AppointmentPage,
        DealsPage,
        LoginPage,
        Page,
        ContactPage,
        CheckinPage,
        AdminPage
    ],
    providers: [{
        provide: ErrorHandler,
        useClass: IonicErrorHandler
        },
        DealsService,
        ServicedbService,
        PageService,
        Push,
        Device,
        PushService,
        AppointmentService,
        FirebaseProvider,
        AuthProvider,
        FirebaseProvider,
        HttpProvider,
        AdminService,
        CheckinService,
        Keyboard
    ]
})
export class AppModule {}
