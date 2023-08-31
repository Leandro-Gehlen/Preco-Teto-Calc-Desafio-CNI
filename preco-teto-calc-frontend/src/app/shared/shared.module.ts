import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth/auth.service';



@NgModule({
  declarations: [],
  providers:[AuthService],
  imports: [
    CommonModule
  ],
})
export class SharedModule { }
