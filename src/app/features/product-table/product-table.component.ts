import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input, Output,
  ViewEncapsulation } from '@angular/core';

import { AbstractProduct } from '../../shared/models';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ProductTableComponent {
  @Input() products: AbstractProduct[];
  @Output() activeProductId: EventEmitter<number> = new EventEmitter<number>();
  activeId: number;
  displayedColumns = ['id', 'title', 'description', 'price', 'date'];

  constructor() {
  }

  getUniqueId(product: AbstractProduct): number {
    return product.id;
  }

  setActiveProduct(id: number) {
    this.activeProductId.emit(this.activeId = id);
  }
}
