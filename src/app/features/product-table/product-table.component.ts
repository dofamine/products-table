import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {combineLatest, Observable} from 'rxjs';
import {User} from './User';
import {DataService} from '../data.service';
import {map, tap} from 'rxjs/operators';
import {ProductFiltersComponent} from '../product-filters/product-filters.component';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss']
})
export class ProductTableComponent implements OnInit {
  users: Observable<User[]>;
  @Input('searchingStream') searching$: Observable<string>;
  @ViewChild(ProductFiltersComponent) filter: ProductFiltersComponent;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.users = combineLatest(this.data.users, this.searching$)
      .pipe(
        tap((data) => console.log(data)),
        map(([users, search]: [User[], string]) => users.filter((user) => user.name.includes(search)))
      );
    console.log(this.users);
  }

  getData() {
    this.data.getUsers();
    console.log(this.filter);
  }
}
