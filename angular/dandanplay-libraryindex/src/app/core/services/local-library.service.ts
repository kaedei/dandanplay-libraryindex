import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { LibraryItem } from '../models/LibraryItem';
import { PlayerConfigResponse } from '../models/PlayerConfigResponse';
import { User } from '../models/User';
import { WelcomeResponse } from '../models/WelcomeResponse';



@Injectable({
  providedIn: 'root'
})
export class LocalLibraryService {

  baseUrl = 'http://localhost:80';
  headers = new HttpHeaders();

  constructor(private httpClient: HttpClient) { }

  testBaseUrl(testBaseUrl: string): Observable<WelcomeResponse> {
    const url = testBaseUrl + "/api/v1/welcome";
    return this.httpClient.get<WelcomeResponse>(url);
  }

  auth(userName:string, password:string): Observable<User>{
    const url = this.baseUrl + "/api/v1/auth";
    return this.httpClient.post<User>(url, {
      userName:userName,
      password: password
    });
  }

  getLibrary(): Observable<LibraryItem[]> {
    const url = this.baseUrl + '/api/v1/library';
    return this.httpClient.get<LibraryItem[]>(url, { headers: this.headers })
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  getPlayerConfig(id: string): Observable<PlayerConfigResponse> {
    const url = this.baseUrl + '/api/v1/playerconfig/' + id;
    return this.httpClient.get<PlayerConfigResponse>(url, { headers: this.headers })
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  setToken(token: string) {
    this.headers.delete("Authorization");
    if (token !== "") {
      this.headers.append("Authorization", "Bearer " + token)
    }
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
