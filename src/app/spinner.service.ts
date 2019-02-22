import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class SpinnerService {
  private spinnerStream: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
  }

  get spinner(): Observable<boolean> {
    return this.spinnerStream.asObservable();
  }

  run() {
    this.spinnerStream.next(true);
  }

  stop() {
    this.spinnerStream.next(false);
  }
}
