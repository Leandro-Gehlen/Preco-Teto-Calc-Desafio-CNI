import { Component } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm = this.fb.group({
    email:['', [Validators.required, Validators.email]],
    password:['', Validators.required],
  })
  constructor(private fb: FormBuilder, private auth:AuthService, private router: Router){}

  onSubmit():void{
    this.auth.login(this.loginForm.value).subscribe({
      next: (res:any)=>{
        console.log(res)
        localStorage.setItem('token', res.access_token)
        this.router.navigate(['/dashboard'])
      },
      error: err => console.log(err),
    })
    this.loginForm.reset()
    
  }

}
