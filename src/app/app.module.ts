import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProductFiltersComponent } from './features/product-filters/product-filters.component';
import { ProductTableComponent } from './features/product-table/product-table.component';
import { ProductDetailsComponent } from './features/product-details/product-details.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductFiltersComponent,
    ProductTableComponent,
    ProductDetailsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
