import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

import { PageModel } from "./page.model";

@Injectable()
export class PageService {

  constructor(private af: AngularFireDatabase) { }

  /**
   * Return single page details
   */
  getPageDetails(id: string) {
    return this.af.object(`pages/${id}`);
  }

  /**
   * Return list of published pages
   */

  all() {
    return this.af.list('pages')
      .map((page: PageModel[]) => {
        return page.filter(page => page.status === 'publish')
      });
  }
}