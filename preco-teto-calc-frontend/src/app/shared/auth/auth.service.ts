import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _signUpUrl = "http://localhost:3000/users/create"
  private _loginUrl = "http://localhost:3000/auth/login"
  constructor(private http: HttpClient, private router:Router) { }

  signUp(user: any){
    return this.http.post(this._signUpUrl, user).pipe(take(1))
  }

  login(user: any){
    return this.http.post(this._loginUrl, user).pipe(take(1))
  }

  loggedIn(){
    return !!localStorage.getItem('token')
  }

  loggedOut(){
    localStorage.removeItem('token')
    this.router.navigate(['/'])
  }

  getToken(){
    return localStorage.getItem('token')
  }
}
