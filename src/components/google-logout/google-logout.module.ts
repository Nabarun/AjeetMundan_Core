import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { GoogleLogoutComponent } from './google-logout';
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    GoogleLogoutComponent,
  ],
  imports: [
    IonicModule,
    CommonModule
  ],
  exports: [
    GoogleLogoutComponent
  ]
})
export class GoogleLogoutComponentModule {}
