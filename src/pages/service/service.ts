import { Component, OnInit } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';

import { ServicedbService } from './servicedb.service'
import { Category } from "./category.model";

@IonicPage({
  name: 'service',
  segment: 'service/:id',
  defaultHistory: ['home']
})
@Component({
  selector: 'page-service',
  templateUrl: 'service.html'
})
export class ServicePage implements OnInit {

  categories: Array<Category>;
  searchCategory: Array<Category>;
  private _id: string;
  openCategory: Array<number> = [];
  items: any;
  constructor(
    private _dbservice: ServicedbService,
    public params: NavParams
  ) { }

  ngOnInit() {
    if (this.params.get('id')) {
      this._id = this.params.get('id');
    }

    this._dbservice.allcats().subscribe(res => {
      this.categories = res;
      this.searchCategory = res;
      if (this._id && this._id !== ':id') {
        this._openFromId(this._id);
      }
    });
  }

  getCategories(ev: any){
    const val = ev.target.value;

    if (val && val.trim() != '') {
      this.searchCategory = this.categories.filter((item) => {
        return (item.title.toLowerCase().startsWith(val.toLowerCase()));
      })
    } else {
      this.searchCategory = this.categories;
    }
  }

  private _openFromId(id: string) {
    const index: number = this.categories.findIndex(category => category.$key === id);
    this.toggleContent(index);
  }
  toggleContent(index) {
    if (this.isOpen(index)) {
      this.openCategory.splice(this.openCategory.indexOf(index), 1);
    } else {
      this.openCategory.push(index);

    }
  }

  isOpen (index: number): boolean {
    return (this.openCategory.indexOf(index) > -1);
  }
}
