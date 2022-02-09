import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class LineItemsService {
  readonly APIURL = environment.apiURL;
  constructor(private http: HttpClient) {
  }
  create(lineItem: any) {
    return this.http.post(this.APIURL + '/lineitem', lineItem);
  }
  getAllLineItem(): Observable<any[]> {
    return this.http.get<any>(this.APIURL + '/lineitem');
  }
  //filter by ItemId
  getLineItemByItemId(itemid) {
    return this.http.get<any>(this.APIURL + '/lineitem', itemid);
  }
  updateLineItem(lineItem: any) {
    return this.http.put(this.APIURL + '/lineitem', lineItem);
  }
  getLineItem(id) {
    return this.http.get(this.APIURL + '/lineitem', id);
  }
  removeLineItem(id) {
    return this.http.delete(this.APIURL + '/lineitem/' + id);
  }
}
