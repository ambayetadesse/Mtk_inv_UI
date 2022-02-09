import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { LookupCatagory } from 'src/Tabels/tabels-list';

@Injectable({
  providedIn: 'root'
})
export class LookupCatagoryService {
  readonly APIURL = environment.apiURL;
  constructor(private http: HttpClient) {
  }
  create(categoryObj) {
    return this.http.post(this.APIURL + '/lookupcatagory', categoryObj);
  }
  getAllLookupCatagory(): Observable<any[]> {
    return this.http.get<any>(this.APIURL + '/lookupcatagory');
  }
  //filter by type from LookupCategory table
  getLookupByType(id: any) {
    return this.http.get(this.APIURL + '/lookupcatagory', id);
  }
  //filter by name from lookup table
  getLookUpByName(name: any) {
    return this.http.get(this.APIURL + '/lookupcatagory', name);
  }
  updateLookUpCatagory(lookupCatagoryObj: LookupCatagory) {
    return this.http.put(this.APIURL + '/lookupcatagory', lookupCatagoryObj);
  }
  removeLookupCatagory(id) {
    return this.http.delete(this.APIURL + '/lookupcatagory/' + id);
  }
}
