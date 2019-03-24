import { Component } from '@angular/core';
import {IonicPage, Keyboard} from 'ionic-angular';

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

  constructor(private _dbservice: ServicedbService, public keyboard : Keyboard) {
    if(this.keyboard.isOpen()){
      this.keyboard.close();
    }
  }

  ngOnInit() {
    this._dbservice.allcats().subscribe(res => {
      this.servicescats = res;
    });
  }

}
