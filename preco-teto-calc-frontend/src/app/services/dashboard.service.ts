import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private _getMeUrl = "http://localhost:3000/users/me"
  private _createStock = "http://localhost:3000/stocks/create"
  private _deleteStock = "http://localhost:3000/stocks/delete"
  private _updateStock = "http://localhost:3000/stocks/update"
  private _getStock = "http://localhost:3000/stocks/find"
  private __getAllStocks = "http://localhost:3000/stocks/all"


  data = []
  idStock = 'uuid qualquer'
  
  constructor(private http: HttpClient) { }

  getMe(){
    return this.http.get(this._getMeUrl)
  }

  createStock(){
    return this.http.post(this._createStock, this.data)
  }

  deleteStock(){
    let httpParams = new HttpParams()
    httpParams.set("id",`${this.idStock}`);
    let options = { params: httpParams };

    return this.http.delete(this._deleteStock,options)
  }

  updateStock(){

    let httpParams = new HttpParams()
    httpParams.set("id",`${this.idStock}`);
    let options = { params: httpParams };

    return this.http.patch(this._updateStock, this.data, options )
  }

  getStock(){
    let httpParams = new HttpParams()
    httpParams.set("id",`${this.idStock}`);
    let options = { params: httpParams };
    return this.http.get(this._getStock, options )
  }

  getAllStocks(){
    return this.http.get(this.__getAllStocks)
  }
}
