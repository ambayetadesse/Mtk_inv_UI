import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  readonly APIURL = environment.apiURL;
  constructor(private http: HttpClient) {
  }
  create(customer) {
    return this.http.post(this.APIURL + '/customer', customer);
  }
  getAllCustomer(): Observable<any[]> {
    return this.http.get<any>(this.APIURL + '/customer');
  }
  getUpdateBalance(id: any) {
    return this.http.get<any>(this.APIURL + '/customer', id);
  }
  //   getUpdateBalance(id :string)
  //   {
  //   const customerObj =  this.db.collection('Customer', ref => ref.where('type','==',  id )).snapshotChanges();
  //   this.customersList= customerObj.pipe(
  //    map(changes => changes.map(a => {
  //      const data = a.payload.doc.data() as Customer;
  //      const id = a.payload.doc.id;
  //      return { id, ...data };
  //    }))
  //  );
  //   return this.customersList;
  // }
  updateCustomer(customerObj: any) {
    return this.http.put(this.APIURL + '/customer', customerObj);
  }
  removeCategory(id) {
    return this.http.delete(this.APIURL + '/customer/' + id);
  }

}
