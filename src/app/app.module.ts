import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
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
import {TabsPage} from "../pages/tabs/tabs";
import {HomeSlider} from "../components/home-slider/home-slider.component";
import {AppointmentPage} from "../pages/appointment/appointment";
import {AppointmentService} from "../pages/appointment/appointment.service";
import {DealsPage} from "../pages/deals/deals";
import {ServicePage} from "../pages/service/service";
import {ContactPage} from "../pages/contact/contact";
import {ServiceModule} from "../pages/service/service.module";
import {DealCard} from "../components/deal-card/deal-card.component";
import {PageTitle} from "../components/page-title/page-title.component";
import {Geolocation} from "@ionic-native/geolocation";
import { GoogleMaps } from '@ionic-native/google-maps';
import { GoogleLoginComponent } from '../components/google-login/google-login';
import {LoginPage} from "../pages/login/login";
import {GooglePlus} from "@ionic-native/google-plus";
import {Page} from "../pages/page/page";
import {FacebookLoginComponent} from "../components/facebook-login/facebook-login";
import {Facebook} from "@ionic-native/facebook";
import {GoogleLogoutComponent} from "../components/google-logout/google-logout";

@NgModule({

  declarations: [
    MyApp,
    HomePage,
    HomeSlider,
    AppointmentPage,
    DealsPage,
    ContactPage,
    LoginPage,
    Page,
    DealCard,
    PageTitle,
    GoogleLoginComponent,
    GoogleLogoutComponent,
    FacebookLoginComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp, config),
    BrowserModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    ServiceModule
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
    ContactPage
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
    GoogleMaps,
    GooglePlus,
    Facebook
  ]
})
export class AppModule {}
