import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DealsPage } from "./deals";

import { SharedModule } from "../../components/shared.module";

@NgModule({
  declarations: [
    DealsPage
  ],
  imports: [
    IonicPageModule.forChild(DealsPage),
    SharedModule.forRoot()
  ],
  entryComponents: [
    DealsPage
  ]
})
export class DealsModule {}
