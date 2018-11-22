import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from "../../components/shared.module";
import { AppointmentService } from './appointment.service';
import { AppointmentPage } from './appointment';
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    AppointmentPage
  ],
  imports: [
    IonicPageModule.forChild(AppointmentPage),
    SharedModule.forRoot(),
    ReactiveFormsModule,
    CommonModule
  ],
  entryComponents: [
    AppointmentPage
  ],
  providers: [
    AppointmentService
  ]
})
export class AppointmentModule {}
