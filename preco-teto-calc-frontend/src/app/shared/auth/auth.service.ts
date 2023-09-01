import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _signUpUrl = "http://localhost:3000/users/create"
  private _loginUrl = "http://localhost:3000/auth/login"
  constructor(private http: HttpClient) { }

  signUp(user: any){
    return this.http.post(this._signUpUrl, user).pipe(take(1))
  }

  login(user: any){
    return this.http.post(this._loginUrl, user).pipe(take(1))
  }

  loggedIn(){
    return !!localStorage.getItem('token')
  }

  getToken(){
    return localStorage.getItem('token')
  }
}
