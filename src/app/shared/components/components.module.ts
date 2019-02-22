import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material';
import { CommonModule } from '@angular/common';

import { SpinnerComponent } from './spiner';

@NgModule({
  declarations: [
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ],
  exports: [SpinnerComponent]
})
export class ComponentsModule {
}
