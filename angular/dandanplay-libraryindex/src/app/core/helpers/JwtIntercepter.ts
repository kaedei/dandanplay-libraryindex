import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { LocalLibraryService } from '../services/local-library.service';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    
    constructor(private authenticationService: AuthenticationService, private localLibraryService: LocalLibraryService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to api url
        const user = this.authenticationService.getCurrentUser();
        const isLoggedIn = user && user.token;
        const isApiUrl = !this.localLibraryService.baseUrl || request.url.startsWith(this.localLibraryService.baseUrl);
        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${user?.token}`
                }
            });
        }

        return next.handle(request);
    }
}