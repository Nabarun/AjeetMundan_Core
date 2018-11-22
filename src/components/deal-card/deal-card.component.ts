import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DealsService } from '../../pages/deals/deals.service';
import { Deals } from '../../pages/deals/deals.model';

@Component({
  selector: 'deal-card',
  templateUrl: 'deal-card.component.html'
})
export class DealCard {
  @Input() deal: Deals;
  @Input() canGrab: boolean = false;

  constructor(public navCtrl: NavController, private _dbdeals: DealsService) { }

  ngOnInit() {
    this.deal.ordercount = this.deal.ordercount ? this.deal.ordercount : 0;
  }

  grabDeal() {
    this.deal.ordercount++;
    this._dbdeals.updateDealOrder(this.deal.$key, this.deal.ordercount.toString()).then(res => {
      this._dbdeals.updateDealgrab(this.deal);
      this.navCtrl.push('appointment');
    });
  }

}
