import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService {

  constructor(private _authService: AuthService) { }

  intercept(req, next) {
    const reqClone = req.clone({
      headers: new HttpHeaders().set('authtoken', this._authService.checkLogin())
    });
    return next.handle(reqClone);
  }
}
