import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth/auth.service';
import { TokenInterceptorService } from './auth/token-interceptor.service';




@NgModule({
  declarations: [],
  providers:[
    AuthService,
    TokenInterceptorService
  ],
  imports: [
    CommonModule
  ],
})
export class SharedModule { }
