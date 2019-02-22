import { Injectable } from '@angular/core';
import { catchError, delay, switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';

import { SearchObject } from "./shared/models";
import { products } from './shared/data';
import { AbstractProduct } from './shared/models';
import { SpinnerService } from "./spinner.service";

@Injectable()
export class MockService {
  private productsData: AbstractProduct[] = [];
  private productsStream: BehaviorSubject<AbstractProduct[]> = new BehaviorSubject<AbstractProduct[]>(this.productsData);
  private daysMilliseconds: number = 24 * 60 * 1000 * 60 - 1;

  constructor(private spinnerService: SpinnerService) {
  }

  get products(): Observable<AbstractProduct[]> {
    return this.productsStream.asObservable();
  }

  getProducts(): Observable<AbstractProduct[]> {
    return of(products).pipe(
      tap(() => this.spinnerService.run()),
      delay(1500),
      tap((data) => {
        this._products = data;
        this.spinnerService.stop()
      })
    );
  }

  filterProducts({ searchString, date, price }: SearchObject) {
    let result: AbstractProduct[] = [...this.productsData];
    result = searchString ? this.filterBySearchString(result, searchString) : result;
    result = date ? this.filterByDate(result, date) : result;
    result = price ? this.filterByPrice(result, price) : result;

    this.productsStream.next(result);
  }

  getProductById(id: number): AbstractProduct | undefined {
    return this.productsData.find((product) => product.id === id);
  }

  updateProduct(product: AbstractProduct): Observable<any> {
    return of(product).pipe(
      tap(() => this.spinnerService.run()),
      delay(2000),
      switchMap((data) => data.price > 1000 ? throwError('price can not be more than 1000') : of(data)),
      tap((data) => {
        this._products = this.productsData.map(elem => elem.id === data.id ? { ...elem, ...data } : elem);
        this.spinnerService.stop();
      }),
      catchError((err) => {
        this.spinnerService.stop();
        return of(err);
      })
    )
  }

  private set _products(data: AbstractProduct[]) {
    this.productsData = [...data];
    this.productsStream.next([...this.productsData]);
  }

  private filterBySearchString(products: AbstractProduct[], searchString: string): AbstractProduct[] {
    const regExp = new RegExp(searchString, 'gi');
    return products.filter(({ description: d, title: t }) =>
      ~d.search(regExp) || ~t.search(regExp))
  }

  private filterByDate(products: AbstractProduct[], searchDate: number): AbstractProduct[] {
    return products.filter(({ date }) => date >= searchDate && date <= searchDate + this.daysMilliseconds);
  }

  private filterByPrice(products: AbstractProduct[], searchPrice: number): AbstractProduct[] {
    return products.filter(({ price }) => price <= searchPrice);
  }
}
