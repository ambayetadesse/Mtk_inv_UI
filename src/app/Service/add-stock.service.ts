import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { AppError } from '../common/app-error';
import { BadInput } from '../common/bad-input';
import { NotFoundError } from '../common/not-found-error';
@Injectable({
  providedIn: 'root'
})
export class AddStockService {
  readonly APIURL = environment.apiURL;
  constructor(private http: HttpClient) {
  }
  create(val: any) {
    return this.http.post(this.APIURL + '/addstock', val);
  }
  getAllAddStock(): Observable<any[]> {
    return this.http.get<any>(this.APIURL + '/addstock');
  }
  updateAddStock(val: any) {
    return this.http.put(this.APIURL + '/addstock/', val);
  }
  deleteAddStock(id) {
    return this.http.delete(this.APIURL + '/addstock/' + id).toPromise();
  }

  private handleError(error: Response) {
    if (error.status === 400) {
      return Observable.throw(new BadInput(error.json()));
    }

    if (error.status === 404) {
      return Observable.throw(new NotFoundError());
    }

    return Observable.throw(new AppError(error));
  }

}