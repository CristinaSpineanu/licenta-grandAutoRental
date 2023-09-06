import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Injectable()
export class TokenInterceptorInterceptor implements HttpInterceptor {
  public constructor(
    private router:Router
  ) {}

  public intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');

    if (token) {
      //daca avem un token atunci vom seta header-ul
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
    }
    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          console.log(error.url); //afisam eroarea
          if (error.status === 401 || error.status === 403) {
            if(this.router.url ==='/'){
            }else{
              localStorage.clear();
              this.router.navigate(['/']); //clear storage si navigam la homepage
            }
          }
        }
        return throwError(error);
      })
    );
  }
}
