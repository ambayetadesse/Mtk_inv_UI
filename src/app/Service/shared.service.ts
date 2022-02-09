import { Subject } from 'rxjs';
import { BehaviorSubject } from "rxjs";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  VoucherTypeId = new BehaviorSubject<any>({ id: 1, name: "Good Recieve" });
  balance = new Subject<any>();
  itemsList = new Subject<any>();
  sessionId = new Subject<any>();
  storeId = new Subject<any>();
  listOfItemAdd = new Subject<any>();
  importData = new Subject<any>();
  exportDataItems = new Subject<any>();
  itemsId = new Subject<any>();
  listOfItemsFromFilter = new Subject<any>();
  listOfItems = new Subject<any>();
  sortName = new Subject<any>();
  listOfVendorFromSorting = new Subject<any>();
  listOfVendorFromFilter = new Subject<any>();
  voucherNumber = new BehaviorSubject<any>({});
  TranscationType = new BehaviorSubject<any>({});
  items = new Subject<any>()
  constructor() { }
}
