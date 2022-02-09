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
export class UserService {
  readonly APIURL = environment.apiURL;
  constructor(private http: HttpClient) {
  }
  create(user) {
    return this.http.post(this.APIURL + '/users', user);
  }
  getAllUser(): Observable<any[]> {
    return this.http.get<any>(this.APIURL + '/users');
  }
  //filter by empId from users table
  getUserId(id: any) {
    return this.http.get(this.APIURL + '/users', id);
  }
  private handleError(error: Response) {
    if (error.status === 400)
      return Observable.throw(new BadInput(error.json()));

    if (error.status === 404)
      return Observable.throw(new NotFoundError());

    return Observable.throw(new AppError(error));
  }

}
