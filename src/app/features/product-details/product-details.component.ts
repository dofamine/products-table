import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges, OnDestroy,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { takeWhile } from 'rxjs/operators';

import { AbstractProduct } from '../../shared/models';
import { MockService } from '../../mock.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailsComponent implements OnChanges, OnDestroy {
  @Input() product: AbstractProduct = null;
  editForm: FormGroup;
  now: Date = new Date();
  private alive: boolean = true;

  constructor(private fb: FormBuilder,
              private mockService: MockService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.product.firstChange) {
      this.initForm();
    }
  }

  ngOnDestroy() {
    this.alive = false;
  }

  get title(): FormControl {
    return this.editForm.get('title') as FormControl;
  }

  get price(): FormControl {
    return this.editForm.get('price') as FormControl;
  }

  get date(): FormControl {
    return this.editForm.get('date') as FormControl;
  }

  get description(): FormControl {
    return this.editForm.get('description') as FormControl;
  }

  submit() {
    if (this.editForm.valid) {
      let product = this.editForm.getRawValue();
      product = { ...this.product, ...product, date: product.date.getTime() };
      this.mockService.updateProduct(product).subscribe({
        error: (err: string) => alert(`${err}`),
      });
    }
  }

  initForm() {
    this.editForm = this.fb.group({
      title: this.fb.control(this.product.title, Validators.required),
      description: this.fb.control(this.product.description, Validators.required),
      price: this.fb.control(this.product.price, [Validators.required]),
      date: this.fb.control(new Date(this.product.date), Validators.required),
    }, { updateOn: 'blur' });

    this.editForm.valueChanges.pipe(
      takeWhile(() => this.alive)
    ).subscribe(this.submit.bind(this));
  }
}
