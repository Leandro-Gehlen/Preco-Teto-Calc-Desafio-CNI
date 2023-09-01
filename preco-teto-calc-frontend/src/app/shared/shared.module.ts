import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth/auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './auth/token-interceptor.service';




@NgModule({
  declarations: [],
  providers:[AuthService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi:true
  }
  ],
  imports: [
    CommonModule
  ],
})
export class SharedModule { }
