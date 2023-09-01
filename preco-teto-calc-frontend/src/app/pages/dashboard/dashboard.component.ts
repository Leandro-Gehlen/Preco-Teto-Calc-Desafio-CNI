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

  headers=[
    "ID", 
    "NOME EMPRESA",
    "CÓDIGO DO ATIVO",
    "YELD 1",
    "YELD 2",
    "YELD 3",
    "YELD 4",
    "YELD 5",
    "%",
  ]

  rows =[
      {
        "stock_id": "1c93eefa-222a-48b6-8a1d-bc1d76e6c9e9",
        "asset_name": "Petrobras",
        "asset_code": "PETR4",
        "year1": "1",
        "year2": "2",
        "year3": "4",
        "year4": "3",
        "year5": "10",
        "percentage": "0.06",
        "top_price": "66.66666666666667",
        "created_at": "2023-08-31T00:22:22.608Z",
        "updated_at": "2023-08-31T00:22:22.608Z"
      },
      {
        "stock_id": "50f68950-b543-4a77-b8ee-4a8248295860",
        "asset_name": "Petrobras",
        "asset_code": "PETR4",
        "year1": "1",
        "year2": "2",
        "year3": "4",
        "year4": "3",
        "year5": "34",
        "percentage": "0.06",
        "top_price": "146.66666666666669",
        "created_at": "2023-08-31T01:49:42.887Z",
        "updated_at": "2023-08-31T01:49:42.887Z"
      },
  ]

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
