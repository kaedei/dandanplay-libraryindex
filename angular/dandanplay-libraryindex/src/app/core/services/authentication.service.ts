import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/User';
import { LocalLibraryService } from './local-library.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(private localLibraryService: LocalLibraryService,
    private router: Router) {
    this.userSubject = new BehaviorSubject<User>(User.createAnonymousUser());
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  login(userName: string, password: string) {
    this.localLibraryService.auth(userName, password)
      .subscribe(u => {
        this.userSubject.next(u);
        return u;
      });
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(User.createAnonymousUser());
    this.router.navigate(['/login']);
  }
}
