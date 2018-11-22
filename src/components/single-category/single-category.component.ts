import { Component, Input, Output, EventEmitter } from '@angular/core';

import { ServicedbService } from '../../pages/service/servicedb.service';
import { Service } from '../../pages/service/service.model';
import { Category } from '../../pages/service/category.model';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'single-category',
  templateUrl: 'single-category.component.html'
})
export class SingleCategory {

  @Input() category: Category;
  @Input() isOpen: boolean = false;
  @Output() onChangeState = new EventEmitter();

  serviceItems: Observable<Service[]>;

  constructor(private _dbservice: ServicedbService) { }

  ngOnInit() {
    this.serviceItems = this._dbservice.serviceByCategory(this.category.$key);
  }

  changeState() {
    this.onChangeState.emit();
  }

}
