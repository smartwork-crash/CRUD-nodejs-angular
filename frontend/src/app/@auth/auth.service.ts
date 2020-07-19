import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  default: string = 'http://localhost:3001/';
  loginUrl: string = 'auth/login/';

  constructor(private http: HttpClient) { }

  login(loginData) {
    return this.http.post(this.default + this.loginUrl, loginData).pipe(map(res => res), catchError(error => error));
  }


}
