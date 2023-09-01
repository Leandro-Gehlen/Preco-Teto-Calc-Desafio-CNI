import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  constructor(private dashboardService: DashboardService,
    private router: Router){}

  stock = []
  userData:any = null

  ngOnInit(): void {
   this.dashboardService.getMe().subscribe({
      next: res => this.userData = res,
      error: (err)=>{
        if(err instanceof HttpErrorResponse){
          if(err.status === 401){
            this.router.navigate(['/login'])
          }
        }
      }
    }) 
  }
}
