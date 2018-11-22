import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabsPage } from './tabs';
import {SharedModule} from "../../components/shared.module";

@NgModule({
  declarations: [
    TabsPage
  ],
  imports: [
    IonicPageModule.forChild(TabsPage),
    SharedModule.forRoot()
  ],
  exports: [
    TabsPage
  ]
})
export class TabsPageModule {}
