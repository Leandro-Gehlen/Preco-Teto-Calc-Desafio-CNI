import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  logged:boolean = this.authService.loggedIn()
  constructor(private authService:AuthService){}

  userLogout(){
    this.authService.loggedOut()
  }
}
