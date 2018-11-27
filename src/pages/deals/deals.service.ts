import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Deals } from './deals.model';
import { ServicedbService } from "../service/servicedb.service";
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';

@Injectable()
export class DealsService {
  private dealgrab: BehaviorSubject<Deals> = new BehaviorSubject<Deals>(null);
  dealgrab$ = this.dealgrab.asObservable();

  constructor(private af: AngularFireDatabase, private serviceDb: ServicedbService) { }

  deal: FirebaseListObservable<Deals[]> = this.af.list('deals', { preserveSnapshot: true });

  updateDealgrab(grabData: Deals) {
    this.dealgrab.next(grabData);
  }

  /**
   * Returns all deals that are active and can be grabbed
   */
  getActiveDeals(): Observable<Deals[]> {
    return this.af.list('deals', {
      query: {
        orderByChild: 'expiredate',
        startAt: new Date().toDateString()
      }
    }).map((deals: Deals[]) => {
      return deals.filter(deal => deal.status === 'publish')
        .filter(deal => deal.ordercount < deal.userlimit)
    })
  }

  /**
   * Return all deals with related srevice
   */

  getActiveDealsDetails(): Observable<Deals[]> {
    return this.getActiveDeals()
      .map(deals => deals.map(deal => {
        deal.service$ = this.serviceDb.getServiceDetails(deal.serviceid);
        return deal;
      }))
  }

  /**
   *  Return update deal
   */

  updateDealOrder(id: string, newVal: string) {
    return this.af.object(`deals/${id}`).update({ ordercount: newVal });
  }

}
