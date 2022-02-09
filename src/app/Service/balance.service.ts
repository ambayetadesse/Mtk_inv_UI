import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/throw';
import { BadInput } from '../common/bad-input';
import { NotFoundError } from '../common/not-found-error';
import { AppError } from '../common/app-error';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class BalanceService {
  readonly APIURL = environment.apiURL;
  constructor(private http: HttpClient) {
  }
  // create balance 
  create(val: any) {
    return this.http.post(this.APIURL + '/itemstorebalance', val);
  }
  getAllBalance() {
    return this.http.get<any>(this.APIURL + '/itemstorebalance');
  }
  updateBalance(balance: any) {
    return this.http.put(this.APIURL + '/itemstorebalance/', balance);
  }
  private handleError(error: Response) {
    if (error.status === 400)
      return Observable.throw(new BadInput(error.json()));

    if (error.status === 404)
      return Observable.throw(new NotFoundError());

    return Observable.throw(new AppError(error))
  }

}
