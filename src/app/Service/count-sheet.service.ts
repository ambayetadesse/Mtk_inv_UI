import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CountSheetService {
  readonly APIURL = environment.apiURL;
  constructor(private http: HttpClient) {
  }

  create(countsheet: any) {
    return this.http.post(this.APIURL + '/countsheet', countsheet);
  }
  getAllCountSheet(): Observable<any[]> {
    return this.http.get<any>(this.APIURL + '/countsheet');
  }
  updateCountSheet(countsheet: any) {
    return this.http.put(this.APIURL + 'countsheet', countsheet);
  }
  deleteCountSheet(countsheetId: any) {
    return this.http.delete(this.APIURL + '/countsheet/' + countsheetId);
  }
}