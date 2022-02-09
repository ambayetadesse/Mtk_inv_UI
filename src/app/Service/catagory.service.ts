import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { LookupCatagory } from 'src/Tabels/tabels-list';
import { AppError } from '../common/app-error';
import { BadInput } from '../common/bad-input';
import { NotFoundError } from '../common/not-found-error';
@Injectable({
  providedIn: 'root'
})
export class CatagoryService {
  readonly APIURL = environment.apiURL;
  constructor(private http: HttpClient) {
  }
  create(categoryObj: any) {
    return this.http.post(this.APIURL + '/lookupcatagory', categoryObj);
  }
  getAllLookUpCategory() {
    return this.http.get<any>(this.APIURL + '/lookupcatagory');
  }
  getCategory(id) {
    return this.http.get<any>(this.APIURL + '/lookupcatagory' + id);
  }
  updateCategory(categoryObj: LookupCatagory) {
    return this.http.put(this.APIURL + '/lookupcatagory', categoryObj)
      .catch(this.handleError);
  }
  addCategory(categoryObj: any) {
    return this.http.post(this.APIURL + '/lookupcatagory', categoryObj)
      .catch(this.handleError);
  }
  removeCategory(id) {
    return this.http.delete(this.APIURL + '/lookupcatagory/' + id)
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

