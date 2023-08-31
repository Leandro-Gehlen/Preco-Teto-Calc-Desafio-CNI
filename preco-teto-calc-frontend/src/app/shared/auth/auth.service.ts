import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _signUpUrl = "http://localhost:3000/users/create"
  constructor(private http: HttpClient) { }

  signUp(user: any){
    return this.http.post(this._signUpUrl, user).pipe(take(1))
  }
}
