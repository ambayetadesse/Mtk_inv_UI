import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class ItemLocationService {

  readonly APIURL = environment.apiURL;
  constructor(private http: HttpClient) {
  }
  create(itemLoObj) {
    return this.http.post(this.APIURL + '/itemlocation', itemLoObj)
  }
  getAllItemLocation(): Observable<any[]> {
    return this.http.get<any>(this.APIURL + '/itemlocation');
  }
  updateItemLoaction(itemLoObj: any) {
    return this.http.put(this.APIURL + '/itemlocation', itemLoObj);
  }
  removeItemLocation(id) {
    return this.http.delete(this.APIURL + '/itemlocation/' + id);
  }
}
