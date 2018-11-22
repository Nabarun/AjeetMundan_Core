import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { GoogleLoginComponent } from './google-login';
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    GoogleLoginComponent,
  ],
  imports: [
    IonicModule,
    CommonModule
  ],
  exports: [
    GoogleLoginComponent
  ]
})
export class GoogleLoginComponentModule {}
