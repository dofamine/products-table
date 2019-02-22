import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";

import { SpinnerService } from "../../../spinner.service";

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  show: Observable<boolean>;

  constructor(private spinnerService: SpinnerService) { }

  ngOnInit() {
    this.show = this.spinnerService.spinner;
  }
}
