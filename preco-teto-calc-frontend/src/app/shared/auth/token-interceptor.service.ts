import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector:Injector) { }

  authService = this.injector.get(AuthService)

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let tokanizedReq = req.clone({
     
      setHeaders:{
        Authorization: `Bearer ${this.authService.getToken()}`
      }
      
    })
    return next.handle(tokanizedReq)
  }
} 

