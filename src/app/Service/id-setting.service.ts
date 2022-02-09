import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class IdSettingService {

  readonly APIURL = environment.apiURL;
  constructor(private http: HttpClient) {
  }
  create(idSetting) {
    return this.http.post(this.APIURL + '/idsetting', idSetting);
  }
  //by filter voucherTypeId
  getIDSetting(id: any) {
    return this.http.get<any>(this.APIURL + '/idsetting', id);
  }
  getAllIdSetting(): Observable<any[]> {
    return this.http.get<any>(this.APIURL + '/idsetting');
  }
  updateIdSetting(obj: any) {
    return this.http.put(this.APIURL + '/idsetting', obj);
  }
  removeIdSetting(id) {
    return this.http.delete(this.APIURL + '/idsetting/' + id);
  }
}
