import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { PageService } from "../pages/page/page.service";
import { PageModel } from "../pages/page/page.model";
import { PushService } from './push.service';
import {AppointmentPage} from "../pages/appointment/appointment";
import {DealsPage} from "../pages/deals/deals";
import {ServicePage} from "../pages/service/service";
import {ContactPage} from "../pages/contact/contact";
import {LoginPage} from "../pages/login/login";
import {Page} from "../pages/page/page";
import {HomePage} from "../pages/home/home";
import {AngularFireAuth} from "angularfire2/auth";
import {AdminPage} from "../pages/admin/admin";

@Component({
  templateUrl: 'app.html',
  providers: [StatusBar, SplashScreen]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'tabs';
  pages: Array<{ title: string, component: any, icon: string, id?: string }>;
  pageList: Array<PageModel>;
  currentUid: any;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    public pageDb: PageService,
    private pushservice: PushService,
    private afAuth: AngularFireAuth,
  ) {
      this.initializeApp();

      this.pages = [
          {title: 'ServicePage', component: ServicePage, icon: "std-icon-menu"},
          {title: 'Contact', component: ContactPage, icon: "std-icon-hairdresser-chair"},
          {title: 'About', component: Page, icon: "std-icon-male-hair"},
          {title: 'Deals/Offers', component: DealsPage, icon: "std-icon-perfume"},
          {title: 'Admin', component: AdminPage, icon: "std-icon-hairdresser-chair-1"}
      ];

      if (this.platform.is('cordova')) {
          this.pushservice.pushInt();
      }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.listPages();
    this.afAuth.authState.subscribe( user => {
      if (user) { this.currentUid = user.uid }
    });
  }

  listPages() {
    this.pageDb.all().subscribe(res => {
      this.pageList = res;
    })
  }

  openPage(page) {
    this.menu.close();
    this.nav.push(page.component);
  }
  openStaticPage(page) {
    this.menu.close();
    this.nav.push('page', { id: page });
  }
}

