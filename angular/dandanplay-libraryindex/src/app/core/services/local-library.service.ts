import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { LibraryItem, LibraryResponse } from '../models/LibraryResponse';



@Injectable({
  providedIn: 'root'
})
export class LocalLibraryService {

  baseUrl = 'http://localhost:80';

  constructor(private httpClient: HttpClient) { }

  getLibrary(): Observable<LibraryItem[]> {
    const url = this.baseUrl + '/api/v1/library';
    return this.httpClient.get<LibraryItem[]>(url)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  private handleError (error: HttpErrorResponse) {
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
