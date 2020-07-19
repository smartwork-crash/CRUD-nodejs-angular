import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthHeaderInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const token = localStorage.getItem('token');
    if (token != null) {

      const authReq = req.clone({
        setHeaders: {
          Authorization: ` bearer ${token}`
        }
      })
      return next.handle(authReq);
    }
    else {
      const authReq = req.clone({
        setHeaders: {
        }
      })
      return next.handle(authReq);

    }
  }
}