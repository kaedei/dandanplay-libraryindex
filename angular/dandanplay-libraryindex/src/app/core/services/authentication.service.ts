import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/User';
import { LocalLibraryService } from './local-library.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private userSubject: Subject<User>;
  private user: Observable<User>;
  public currentUser: User | undefined;

  constructor(private localLibraryService: LocalLibraryService,
    private router: Router) {
    this.userSubject = new Subject<User>();
    this.user = this.userSubject.asObservable();
    this.user.subscribe(u => this.currentUser = u);
  }


  login(userName: string, password: string): Observable<User> {
    return this.localLibraryService.auth(userName, password)
      .pipe(
        map(u => {
          this.userSubject.next(u);
          return u;
        }));
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(User.createAnonymousUser());
    this.router.navigate(['/login']);
  }
}
