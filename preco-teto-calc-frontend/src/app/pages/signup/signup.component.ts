import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  signUpForm = this.fb.group({
    firstName:'',
    lastName:'',
    email:'',
    password:'',
  })
  constructor(private fb:FormBuilder, private authService:AuthService,
    private router: Router){}

  onSubmit(){
    this.authService.signUp(this.signUpForm.value).subscribe({
      next: (res: any)=> {
        console.log(res)
        localStorage.setItem('token', res.data.access_token)
        this.router.navigate(['/dashboard'])
      
      },
      error: err=> {
        console.log(err)
        this.router.navigate(['/signup'])
    }
    })
    this.signUpForm.reset()
  }
}
