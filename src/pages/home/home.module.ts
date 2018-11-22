import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { HomePage } from "./home";
import { HomeSlider } from '../../components/home-slider/home-slider.component';
import { SharedModule } from "../../components/shared.module";

@NgModule({
  declarations: [
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    SharedModule.forRoot()
  ],
  entryComponents: [
  ]
})
export class HomeModule {}
