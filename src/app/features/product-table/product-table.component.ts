import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {User} from './User';
import {DataService} from '../data.service';
import {map, tap} from 'rxjs/operators';
import {ProductFiltersComponent} from '../product-filters/product-filters.component';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss']
})
export class ProductTableComponent implements OnInit, OnDestroy {
  users: Observable<User[]>;
  search$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  @Input('searchingStream') searching$: Observable<string>;
  @ViewChild(ProductFiltersComponent) filter: ProductFiltersComponent;

  constructor(private data: DataService) {
  }

  ngOnInit() {
    this.users = combineLatest(this.data.users, this.searching$, this.search$)
      .pipe(
        tap((data) => console.log(data)),
        map(([users, search, s]: [User[], string, string]) =>
          users.filter((user) => user.name.includes(search) && user.name.includes(s))
        )
      );

  }

  getData() {
    this.data.getUsers();
  }

  searchStr(event) {
    this.search$.next(event);
  }

  ngOnDestroy() {
    console.log(this.searching$);
  }
}
