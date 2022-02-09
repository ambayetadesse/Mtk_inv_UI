import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class StockAdjustmentService {
  readonly APIURL = environment.apiURL;
  constructor(private http: HttpClient) {
  }
  create(Stock) {
    return this.http.post(this.APIURL + '/stockadjustment', Stock);
  }
  //filter by (date desc order) from StockAdjustment table
  getAllStockAdjustment(): Observable<any[]> {
    return this.http.get<any>(this.APIURL + '/stockadjustment');
  }
  updateStockAdjustment(stock: any) {
    return this.http.put(this.APIURL + '/stockadjustment', stock);
  }
  deleteStockAdjustment(StockId: any) {
    return this.http.delete(this.APIURL + '/stockadjustment/' + StockId);
  }
}
