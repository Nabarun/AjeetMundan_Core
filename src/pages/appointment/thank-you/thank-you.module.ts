import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { SharedModule } from "../../../components/shared.module";
import { ThankYouPage } from "./thank-you";

@NgModule({
  declarations: [
    ThankYouPage
  ],
  imports: [
    IonicPageModule.forChild(ThankYouPage),
    SharedModule.forRoot()
  ],
  entryComponents: [
    ThankYouPage
  ]
})
export class AppointmentModule {}
