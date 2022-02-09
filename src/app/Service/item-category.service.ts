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
export class ItemCategoryService {
  readonly APIURL = environment.apiURL;
  constructor(private http: HttpClient) {
  }
  create(obj: any) {
    return this.http.post(this.APIURL + '/itemcategory', obj)
      .catch(this.handleError);
  }
  getAllItemCategories(): Observable<any[]> {
    return this.http.get<any>(this.APIURL + '/itemcategory');
  }
  getItemCategory(id) {
    return this.http.get(this.APIURL + '/itemcategory', id);
  }
  updateItemCategory(itemCategoryObj: any) {
    return this.http.put(this.APIURL + '/itemcategory', itemCategoryObj)
      .catch(this.handleError);
  }
  removeCategory(id) {
    return this.http.delete(this.APIURL + '/itemcategory/' + id)
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