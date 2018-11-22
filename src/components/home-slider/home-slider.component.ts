import { Component } from "@angular/core";
import { Observable } from 'rxjs/Observable';

import { DealsService } from '../../pages/deals/deals.service';
import { Deals } from '../../pages/deals/deals.model';

@Component({
  selector: 'home-slider',
  templateUrl: './home-slider.component.html'
})
export class HomeSlider {
  deals: Observable<Deals[]>;
  slidesPerView: number = 1;

  constructor(private _dbdeals: DealsService) { }

  ngOnInit () {
    this.deals = this._dbdeals.getActiveDeals();

    if (window.innerWidth > 768) {
      this.slidesPerView = 2;
    }
  }
}
