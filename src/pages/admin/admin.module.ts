import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from "../../components/shared.module";
import { AppointmentService } from './appointment.service';
import { AppointmentPage } from './appointment';
import {CommonModule} from "@angular/common";
import {AdminPage} from "./admin";
import {AdminService} from "./admin.service";

@NgModule({
    declarations: [
        AdminPage
    ],
    imports: [
        IonicPageModule.forChild(AdminPage),
        SharedModule.forRoot(),
        ReactiveFormsModule,
        CommonModule
    ],
    entryComponents: [
        AdminPage
    ],
    providers: [
        AdminService
    ]
})
export class AdminModule {}
