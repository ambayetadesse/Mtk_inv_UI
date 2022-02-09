import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/throw';
import { BadInput } from '../common/bad-input';
import { NotFoundError } from '../common/not-found-error';
import { AppError } from '../common/app-error';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class VocherService {
  readonly APIURL = environment.apiURL;
  constructor(private http: HttpClient) {
  }
  create(Vocher) {
    return this.http.post(this.APIURL + '/vocher', Vocher)
      .catch(this.handleError);
  }

  //filter by usrId is null or "" from vocher table
  getVoucherVendorId() {
    return this.http.get(this.APIURL + '/vocher');
  }

  getAllVocher() {
    return this.http.get<any>(this.APIURL + '/vocher');
  }

  updateVocher(vocherObj: any) {
    return this.http.put(this.APIURL + '/vocher', vocherObj)
      .catch(this.handleError);
  }
  addVocher(vendors: any) {
    return this.http.post(this.APIURL + '/vocher', vendors)
      .catch(this.handleError);
  }
  removeVocher(id) {
    return this.http.delete(this.APIURL + '/vocher/' + id)
      .catch(this.handleError);
  }
  private handleError(error: Response) {
    if (error.status === 400)
      return Observable.throw(new BadInput(error.json()));

    if (error.status === 404)
      return Observable.throw(new NotFoundError());

    return Observable.throw(new AppError(error));
  }
}

