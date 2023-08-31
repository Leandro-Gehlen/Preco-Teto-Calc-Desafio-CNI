import { Component } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms'

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
  constructor(private fb: FormBuilder){}

  onSubmit():void{
    console.log("Recebendo os dados do formulário", this.loginForm.value, this.loginForm.invalid)
  }

}
