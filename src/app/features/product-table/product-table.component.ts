import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject, combineLatest, Observable, Subject, Subscriber, Subscription} from 'rxjs';
import {User} from './User';
import {DataService} from '../data.service';
import {map, switchMap, take, takeUntil, takeWhile, tap} from 'rxjs/operators';
import {ProductFiltersComponent} from '../product-filters/product-filters.component';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss']
})
export class ProductTableComponent implements OnInit, OnDestroy {
  users: Observable<User[]>;
  search$: BehaviorSubject<any> = new BehaviorSubject<any>('');
  @Input('searchingStream') searching$: Observable<string>;
  @ViewChild(ProductFiltersComponent) filter: ProductFiltersComponent;
  sub;
  subb = new Subscription();
  subb1 = new Subscriber((value => console.log(value)));

  constructor(private data: DataService) {
  }

  ngOnInit() {
    // this.users = combineLatest(this.data.users, this.searching$, this.search$)
    //   .pipe(
    //     tap((data) => console.log(data)),
    //     map(([users, search, s]: [User[], string, string]) =>
    //       users.filter((user) => user.name.includes(search) && user.name.includes(s))
    //     )
    this.users = this.data.users;
    //   );
    let s;
    s = this.data.users.pipe(switchMap(() => this.search$), take(5)).subscribe(data => console.log('switchMap', s));
    this.search$.subscribe(data => console.log('Search', data));
    this.users.subscribe(data => console.log('Users', data));
  }

  getData() {
    this.data.getUsers();
  }

  searchStr(event) {
    this.search$.next(event);
  }

  ngOnDestroy() {
    this.subb.unsubscribe();
    // this.search$.complete();
    console.log(this.subb);
    console.log('========');
    console.log(this.sub);
  }
}
