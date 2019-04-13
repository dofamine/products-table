import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {publish, share} from 'rxjs/operators';

@Component({
  selector: 'app-product-filters',
  templateUrl: './product-filters.component.html',
  styleUrls: ['./product-filters.component.scss']
})
export class ProductFiltersComponent implements OnInit {
  search: string;
  @Output('searching') s: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  change() {
    this.s.emit(this.search);
  }
}
