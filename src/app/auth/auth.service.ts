import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  $auth = new BehaviorSubject(this.checkLogin());

  checkLogin() {
    return localStorage.getItem('token') || '';
  }

  constructor(private _http: HttpClient, private _router: Router) { }
  login(credentials) {
    this._http.post('http://localhost:2210/authenticate', credentials)
      .subscribe((data: any) => {
        if (data.isLoggedIn) {
          localStorage.setItem('token', data.token);
          this._router.navigate(['/home']);
          this.$auth.next(this.checkLogin());
        } else {
          alert('Invalid credentials, try again please');
        }
      });
  }

  logout() {
    localStorage.removeItem('token');
    this.$auth.next(this.checkLogin());
    this._router.navigate(['login']);
  }
}
