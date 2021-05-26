import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/User';
import { LocalLibraryService } from './local-library.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private userSubject: Subject<User>;
  private user: Observable<User>;
  private currentUser: User | undefined;

  constructor(private localLibraryService: LocalLibraryService,
    private router: Router) {
    this.userSubject = new Subject<User>();
    this.user = this.userSubject.asObservable();
    this.user.subscribe(u => {
      if(u){
        localStorage.setItem("user", JSON.stringify(u));
      }
      this.currentUser = u;
    });
  }

  getCurrentUser(): User | undefined {
    if (!this.currentUser) {
      var cachedUser = localStorage.getItem("user");
      if (cachedUser && cachedUser!=="undefined") {
        this.currentUser = JSON.parse(cachedUser);
      }
    }
    return this.currentUser;
  }


  login(userName: string, password: string): Observable<User> {
    return this.localLibraryService.auth(userName, password)
      .pipe(
        map(u => {
          if (u.error) {
            throw new Error(u.error);
          }
          this.userSubject.next(u);
          return u;
        }));
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(undefined);
    this.router.navigate(['/login']);
  }
}
