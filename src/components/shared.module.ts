import { NgModule, ModuleWithProviders } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { AppointmentFooter } from "./appointment-footer/appointment-footer.component";
import { DealCard } from './deal-card/deal-card.component';
import { PageTitle } from './page-title/page-title.component';
import { SingleCategory } from "./single-category/single-category.component";

import { ServicedbService } from '../pages/service/servicedb.service';

@NgModule({
  declarations: [
    AppointmentFooter,
    SingleCategory
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    AppointmentFooter,
    SingleCategory
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        ServicedbService
      ]
    };
  }
}
