import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class StoreTransferService {
  readonly APIURL = environment.apiURL;
  constructor(private http: HttpClient) {
  }
  // create balance 
  create(storeTranObj) {
    return this.http.post(this.APIURL + '/storetransfer', storeTranObj);
  }
  getAllStoreTransfer(): Observable<any[]> {
    return this.http.get<any>(this.APIURL + '/storetransfer');
  }
  updateStoreTransfer(storeTransfer: any,) {
    return this.http.put(this.APIURL + '/storetransfer', storeTransfer);
  }
  deleteStoreTransfer(storeTransferId: any) {
    return this.http.delete(this.APIURL + '/storetransfer/' + storeTransferId);
  }
}
