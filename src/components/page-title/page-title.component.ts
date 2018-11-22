import { Component, Input } from "@angular/core";

@Component({
  selector: 'page-title',
  templateUrl: './page-title.component.html'
})
export class PageTitle {
  @Input() title: string;
  constructor() { }

  ngOnInit() {
  }
}
