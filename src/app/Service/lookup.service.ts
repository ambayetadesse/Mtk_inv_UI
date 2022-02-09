import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Lookup } from 'src/Tabels/tabels-list';

@Injectable({
  providedIn: 'root'
})
export class LookupService {
  readonly APIURL = environment.apiURL;
  constructor(private http: HttpClient) {
  }
  create(categoryObj: any) {
    return this.http.post(this.APIURL + '/lookup', categoryObj);
    //return this.db.list('/Category').push(Category);
  }
  getAllLookUp(): Observable<any[]> {
    return this.http.get<any>(this.APIURL + '/lookup');
  }
  updateLookup(lookupObj: Lookup) {
    return this.http.put(this.APIURL + '/lookup', lookupObj);
  }
  removeLookup(id) {
    return this.http.delete(this.APIURL + '/lookup/' + id);
  }
}

