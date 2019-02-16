import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { SharedModule } from "../../../components/shared.module";
import {CheckinThanks} from "./checkin-thanks";

@NgModule({
  declarations: [
      CheckinThanks
  ],
  imports: [
    IonicPageModule.forChild(CheckinThanks),
    SharedModule.forRoot()
  ],
  entryComponents: [
      CheckinThanks
  ]
})
export class AppointmentModule {}
