import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { MockService } from '../../mock.service';
import { AbstractProduct, SearchObject } from '../../shared/models';

@Component({
  selector: 'app-product-filters',
  templateUrl: './product-filters.component.html',
  styleUrls: ['./product-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductFiltersComponent implements OnInit {
  @ViewChild('price') priceX: ElementRef<HTMLInputElement>;
  isVisible = false;
  searchForm: FormGroup;
  products: Observable<AbstractProduct[]>;
  private searchDelayTime = 700;
  private minLengthSearch = 3;

  constructor(private mockService: MockService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.products = this.mockService.products;
    this.initForm();
  }

  get toggleFilterClass(): string {
    const baseClassName = 'control-panel__filters';
    const showClass = 'control-panel__filters--show';
    const hideClass = 'control-panel__filters--hide';
    const modification = this.isVisible ? showClass : hideClass;

    return `${baseClassName} ${modification}`;
  }

  get searchString() {
    return this.searchForm.get('searchString') as FormControl;
  }

  get price(): FormControl {
    return this.searchForm.get('price') as FormControl;
  }

  get date(): FormControl {
    return this.searchForm.get('date') as FormControl;
  }

  submit() {
    this.mockService.filterProducts(this.formToSearchObject());
  }

  toggleFiltersVisibility() {
    this.isVisible = !this.isVisible;
  }

  initForm() {
    this.searchForm = this.fb.group({
      searchString: this.fb.control(null),
      price: this.fb.control(null),
      date: this.fb.control(null),
    });
    this.autoSubmit(this.searchString);
    this.autoSubmit(this.price);
  }

  clearFilters() {
    this.searchForm.reset();
  }

  private autoSubmit(control: FormControl) {
    control.valueChanges.pipe(
      debounceTime(this.searchDelayTime),
      distinctUntilChanged()
    ).subscribe(this.submit.bind(this));
  }

  private formToSearchObject(): SearchObject {
    let searchString = this.searchString.dirty && this.searchString.value.trim();
    searchString = searchString && searchString.length >= this.minLengthSearch
      ? this.searchString.value
      : null;

    const price = this.price.value
      ? this.price.value
      : null;

    const date = this.date.value
      ? this.date.value.getTime()
      : null;

    return { searchString, price, date };
  }
}
