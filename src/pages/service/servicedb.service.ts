import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { Service } from './service.model';
import 'rxjs/add/operator/map';

@Injectable()
export class ServicedbService {

  constructor(private af: AngularFireDatabase) { }

  /**
   * service
   */

  service: FirebaseListObservable<Service[]> = this.af.list('service', { preserveSnapshot: true });

  // get All service
  all(): FirebaseListObservable<Service[]> {
    return this.af.list('service');
  }

  /**
   * Return single service details.
   */
  getServiceDetails(id: string) {
    return this.af.object(`service/${id}`);
  }

  /**
   * Category Data service
   */

  category: FirebaseListObservable<any[]> = this.af.list('category', { preserveSnapshot: true });

  /**
   * Return list of all categories
   */

  allcats() {
    return this.af.list('category');
  }

  /**
   * Return single category
   */
  getcat(id: string) {
    return this.af.object(`category/${id}`);
  }

  /**
   * Return services of selected category
   */

  serviceByCategory(category: string) {
    return this.af.list('service', {
      query: {
        orderByChild: 'category',
        equalTo: category
      }
    }).map((service: Service[]) => {
      return service.filter(service => service.status === 'publish')
    })
  }
}
