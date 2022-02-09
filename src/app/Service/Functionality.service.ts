import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class FunctionalityService {
  readonly APIURL = environment.apiURL;
  constructor(private http: HttpClient) {
  }
  create(functionality) {
    return this.http.post(this.APIURL + '/functionality', functionality);
  }
  getAllFunctionality(): Observable<any[]> {
    return this.http.get<any>(this.APIURL + '/functionality');
  }

}
