import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { FacebookLoginComponent } from './facebook-login';
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    FacebookLoginComponent,
  ],
  imports: [
    IonicModule,
    CommonModule
  ],
  exports: [
    FacebookLoginComponent
  ]
})
export class FacebookLoginComponentModule {}
