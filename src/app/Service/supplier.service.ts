import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  readonly APIURL = environment.apiURL;
  constructor(private http: HttpClient) {
  }
  create(supplierObj) {
    return this.http.post(this.APIURL + '/supplier', supplierObj);
  }
  getAllSupplier(): Observable<any[]> {
    return this.http.get<any>(this.APIURL + '/supplier');
  }
  updateSupplier(supplierObj: any) {
    return this.http.put(this.APIURL + '/supplier', supplierObj);
  }
  removeSupplier(id) {
    return this.http.delete(this.APIURL + '/supplier/' + id);
  }
}
