import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { AppError } from '../common/app-error';
import { BadInput } from '../common/bad-input';
import { NotFoundError } from '../common/not-found-error';
@Injectable({
  providedIn: 'root'
})
export class VendorsService {
  readonly APIURL = environment.apiURL;
  constructor(private http: HttpClient) {
  }

  create(vendorObj) {
    return this.http.post(this.APIURL + '/vendors', vendorObj);
  }
  getAllVendor() {
    return this.http.get<any>(this.APIURL + '/vendors');
  }
  //filter by id from vendor table 
  getVendorById(id: any) {
    return this.http.get(this.APIURL + '/vendors', id);
  }
  updateVendor(vendorsObj: any) {
    return this.http.put(this.APIURL + '/vendors', vendorsObj);
  }
  addSupplier(vendors: any) {
    return this.http.get(this.APIURL + '/vendors', vendors);
  }
  removeVendor(id) {
    return this.http.delete(this.APIURL + '/vendors/' + id);
  }
  private handleError(error: Response) {
    if (error.status === 400)
      return Observable.throw(new BadInput(error.json()));

    if (error.status === 404)
      return Observable.throw(new NotFoundError());

    return Observable.throw(new AppError(error));
  }
}
