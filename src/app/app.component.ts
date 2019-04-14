import { Component } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'table';
  toogle: boolean;
  search$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() {
  }

  get searchStream(): Observable<string> {
    return this.search$.asObservable();
  }

  search(event) {
    this.search$.next(event);
  }

  togle() {
    this.toogle = !this.toogle;
  }
}
