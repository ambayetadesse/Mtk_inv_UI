import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { AuthInterceptorService } from './auth-interceptor.service';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  readonly APIURL = environment.apiURL;
  constructor(private http: HttpClient, private sharedService: SharedService,
    private _authService: AuthInterceptorService) {
  }

  getItemList() {

    //return this.http.get(environment.apiURL+'/Item').toPromise();
  }

  create(items) {
    return this.http.post(this.APIURL + '/items', items);
  }
  //filter by id from items table
  getBalanceByItemId(id: any) {
    return this.http.get(this.APIURL + '/items', id);
  }
  //filter by type from items table 
  getItemByLookup(selectedLookup: any) {
    return this.http.get(this.APIURL + '/items', selectedLookup);
  }
  //filter by type from items table
  getItemByID(id: any) {
    return this.http.get(this.APIURL + '/items', id);
  }
  //filter by id from items table
  getItemID(id: any) {
    return this.http.get(this.APIURL + '/items', id);
  }
  //filter by storeid from items table
  getItemByStoreID(storeid: any) {
    return this.http.get(this.APIURL + '/items', storeid);
  }
  getAllItem() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IkZlbGVrdSIsIm5iZiI6MTY0NDIzOTA5OSwiZXhwIjoxNjQ0MjQyNjk5LCJpYXQiOjE2NDQyMzkwOTl9.zhyKfthNGtcoxo1bRyqpMt3c-zdxF8vL4625hVzUlKs'
    });
    console.log(JSON.parse(JSON.stringify(localStorage.getItem('Authorization'))))
    return this.http.get<any>(this.APIURL + '/items', { headers: headers });
  }
  //filter by storeid,Quantity,name,price and AmaricName from items table
  getAllItemKEY(Quantity, storeid, name, amhricName, price) {
    return this.http.get(this.APIURL + '/items', Quantity);
  }
  updateItem(Item: any) {
    return this.http.put(this.APIURL + '/items', Item);
  }
  removeItems(id) {
    return this.http.delete(this.APIURL + '/items/' + id);
  }
}

