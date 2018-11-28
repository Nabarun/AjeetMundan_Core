import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { ServicedbService } from '../service/servicedb.service'

@IonicPage({
  name: 'home'
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  servicescats: any = [];

  constructor(private _dbservice: ServicedbService) {

  }

  ngOnInit() {
    this._dbservice.allcats().subscribe(res => {
      this.servicescats = res;
    });
  }

}
