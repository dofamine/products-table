import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { MockService } from './mock.service';
import { AbstractProduct } from './shared/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  products: Observable<AbstractProduct[]>;
  activeProduct: AbstractProduct = null;

  constructor(private mockService: MockService) {
  }

  ngOnInit(): void {
    this.products = this.mockService.products;
    this.mockService.getProducts().pipe(take(1)).subscribe();
  }

  setActiveProduct(id: number) {
    this.activeProduct = this.mockService.getProductById(id);
  }
}
