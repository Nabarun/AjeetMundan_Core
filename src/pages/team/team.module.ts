import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { SharedModule } from "../../components/shared.module";
import { TeamService } from "./team.service";
import { TeamPage } from "./team";

@NgModule({
  declarations: [
    TeamPage
  ],
  imports: [
    IonicPageModule.forChild(TeamPage),
    SharedModule.forRoot()
  ],
  entryComponents: [
    TeamPage
  ],
  providers: [
    TeamService
  ]
})
export class TeamModule {}
