import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { LogoutComponent } from './logout';
import {CommonModule} from "@angular/common";

@NgModule({
    declarations: [
        LogoutComponent,
    ],
    imports: [
        IonicModule,
        CommonModule
    ],
    exports: [
        LogoutComponent
    ]
})
export class LogoutComponentModule {}