import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { Observable } from "rxjs/Observable";

import { DealsService } from './deals.service';
import { Deals } from './deals.model';

@IonicPage({
  name: 'deals',
  defaultHistory: ['home']
})
@Component({
  selector: 'page-deals',
  templateUrl: 'deals.html'
})

export class DealsPage {
  deals: Observable<Deals[]>;

  constructor(private _dbdeals: DealsService) { }

  ngOnInit() {
    this.deals = this._dbdeals.getActiveDealsDetails();
  }
}
