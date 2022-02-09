import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class VoucherTransationService {
  readonly APIURL = environment.apiURL;
  constructor(private http: HttpClient) {
  }

  create(vocherTransation) {

    return this.http.post(this.APIURL + '/vocherstoretransation', vocherTransation);
  }

  getAllVocher() {
    return this.http.get<any>(this.APIURL + '/vocherstoretransation');
  }

  updateVocherTransation(vocherTransationObj: any) {
    return this.http.put(this.APIURL + '/vocherstoretransation', vocherTransationObj);
  }

  addVocherTransation(vendors: any) {
    return this.http.post(this.APIURL + '/vocherstoretransation', vendors);
  }
  removeVocherTransation(id) {
    return this.http.delete(this.APIURL + '/vocherstoretransation/' + id);
  }
}
