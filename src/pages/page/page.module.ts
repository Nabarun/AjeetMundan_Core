import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Page } from "./page";
import { SharedModule } from "../../components/shared.module";

@NgModule({
  declarations: [
    Page
  ],
  imports: [
    IonicPageModule.forChild(Page),
    SharedModule.forRoot()
  ],
  entryComponents: [
    Page
  ]
})
export class AboutModule {}
