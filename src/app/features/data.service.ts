import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from './product-table/User';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  user$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(users);

  constructor() {
  }

  get users(): Observable<User[]> {
    return this.user$.asObservable();
  }

  getUsers() {
    this.user$.next([...users, {id: Date.now(), name: 'Game'}]);
  }
}

const users: User[] = [
  {id: 2, name: 'Vasya'},
  {id: 5, name: 'Petia'},
  {id: 6, name: 'Detya'},
  {id: 9, name: 'Gala'},
  {id: 20, name: 'Tana'}
];
