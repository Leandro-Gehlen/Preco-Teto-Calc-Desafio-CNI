import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/services/dashboard.service';

import {GetMeResponse} from '../dashboard/interface/get-me-response.interface'

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

  

  ngOnInit(): void {
   this.dashboardService.getMe().subscribe({
      next: (res)=>{
        console.log(res)
        this.userData = res as GetMeResponse
      },
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
