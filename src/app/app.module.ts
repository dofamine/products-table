import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatNativeDateModule, MatTableModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { ProductFiltersComponent } from './features/product-filters';
import { ProductTableComponent } from './features/product-table';
import { ProductDetailsComponent } from './features/product-details';
import { MockService } from './mock.service';
import { TotalMessagePipe } from './features/product-filters';
import { SharedModule } from "./shared/shared.module";
import { SpinnerService } from "./spinner.service";

@NgModule({
  declarations: [
    AppComponent,
    ProductFiltersComponent,
    ProductTableComponent,
    ProductDetailsComponent,
    TotalMessagePipe,
  ],
  imports: [
    BrowserModule,
    MatTableModule,
    CdkTableModule,
    MatInputModule,
    SharedModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ],
  providers: [MockService, SpinnerService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
