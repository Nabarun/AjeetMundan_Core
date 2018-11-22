import {Component, OnInit} from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';

import { PageService } from "./page.service";
import { PageModel } from "./page.model";

@IonicPage({
  name: 'page',
  segment: 'page/:id',
  defaultHistory: ['home']
})
@Component({
  selector: 'page',
  templateUrl: 'page.html'
})
export class Page implements OnInit {

  private _id: string;
  pageDetails: PageModel;

  constructor(public params: NavParams, public pageDb: PageService) { }

  ngOnInit() {
    this._id = this.params.get('id');
    this.pageDb.getPageDetails(this._id).subscribe(res => {
      this.pageDetails = res;
    })
  }

}
