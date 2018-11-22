import { NgModule } from '@angular/core';
import {IonicPageModule, NavController} from 'ionic-angular';
import { ServicePage } from "./service";
import { SharedModule } from "../../components/shared.module";
import {Data} from "../../providers/data/data";
import {FormControl} from "@angular/forms";


@NgModule({
  declarations: [
    ServicePage
  ],
  imports: [
    IonicPageModule.forChild(ServicePage),
    SharedModule.forRoot()
  ],
  entryComponents: [
    ServicePage
  ]
})
export class ServiceModule {}
