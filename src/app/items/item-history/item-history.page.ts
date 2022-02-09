import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { BalanceService } from 'src/app/Service/balance.service';
import { CustomerService } from 'src/app/Service/customer.service';
import { ItemsService } from 'src/app/Service/items.service';
import { LineItemsService } from 'src/app/Service/line-items.service';
import { LookupService } from 'src/app/Service/lookup.service';
import { SharedService } from 'src/app/Service/shared.service';
import { StockAdjustmentService } from 'src/app/Service/stock-adjustment.service';
import { StoreTransferService } from 'src/app/Service/store-transfer.service';
import { VendorsService } from 'src/app/Service/vendors.service';
import { VocherService } from 'src/app/Service/vocher.service';
import { VoucherTransationService } from 'src/app/Service/voucher-transation.service';
import { Items, LineItem, Lookup, Vocher } from 'src/Tabels/tabels-list';

@Component({
  selector: 'app-item-history',
  templateUrl: './item-history.page.html',
  styleUrls: ['./item-history.page.scss'],
})
export class ItemHistoryPage implements OnInit {
  @Input() public data;
  listOfVoucherTransaction: any[] = [];
  listOfVoucher: Vocher[];
  listOfItemStoreBalance: any[];
  listOfLineItem: LineItem[];
  ListoftranscationType: any[] = [];
  listOfStore: Lookup[];
  listOfLookup: Lookup[];
  listOfStoreTransfer: any[];
  listOfStoreByType: Lookup[];
  transactionType: string;
  listOfVocherStoreTransation: any[];
  vocherTypeId: any;
  selectedRows: string[];
  allMode: string;
  checkBoxesMode: string;
  updateSetting: number;
  ListOfItems: any[];
  VocherNo: any;
  listofItems: Items[];
  userIds: any;
  fromStoreId: string;
  ToStoreId: string;
  vendorIds: any;
  itemBalanceId: string;
  voucherTransactionId: any[];
  listOfVendor: any;
  listOfCustomer: any;
  loader: HTMLIonLoadingElement;

  constructor(private lookupService: LookupService,
    private voucherService: VocherService,
    private balanceService: BalanceService,
    private lineItemService: LineItemsService,
    private storeTransferService: StoreTransferService,
    private voucherTransationService: VoucherTransationService,
    private stockAdjustment: StockAdjustmentService,
    private itemsService: ItemsService,
    private vendorService: VendorsService,
    private customerService: CustomerService,
    private router: Router,
    private sharedService: SharedService,
    private modalController: ModalController,
    private loadingController: LoadingController) {
    this.allMode = 'allPages';
    this.checkBoxesMode = 'onClick'
  }

  async ngOnInit() {
    this.loader = await this.loadingController.create({
      message: 'data loading ... ',
      spinner: 'bubbles',
      animated: true,
      //duration:3000
    })
    //await this.loader.present().then();
    this.getItemStoreBalnce();
    this.getVocher();
    //this.getVoucherTransaction();
    this.getLineItem();
    this.Transaction_Type();
    this.getStore();
    this.getLookup();
    this.getStoreTransfer();
    this.getVoucherStoreTransaction();
    this.getItemsHistory();
    this.getItems();
    this.getAllCustomerList();
    this.getAllVendorList();
  }
  closeItemHistory() {
    this.modalController.dismiss();
  }
  async getAllVendorList() {
    this.vendorService.getAllVendor().subscribe(async res => {
      this.listOfVendor = await res;
    });
  }
  async getAllCustomerList() {
    this.customerService.getAllCustomer().subscribe(async res => {
      this.listOfCustomer = await res;
    })
  }
  async getItems() {
    this.itemsService.getAllItem().subscribe(async res => {
      this.listofItems = await res;
    })
  }
  async getLookup() {
    this.lookupService.getAllLookUp().subscribe(async lookupObj => {
      this.listOfLookup = await lookupObj
    })
  }
  async getVocher() {
    this.voucherService.getAllVocher().subscribe(async res => {
      this.listOfVoucher = await res;
    })
  }
  async getItemStoreBalnce() {
    this.balanceService.getAllBalance().subscribe(async res => {
      this.listOfItemStoreBalance = await res;
    })
  }
  async getLineItem() {
    this.lineItemService.getAllLineItem().subscribe(async res => {
      this.listOfLineItem = await res;
    })
  }
  async getStore() {
    this.lookupService.getAllLookUp().subscribe(async res => {
      this.listOfStore = await res.filter(c => c.type == 3);
    })
  }
  async getVoucherStoreTransaction() {
    this.voucherTransationService.getAllVocher().subscribe(async res => {
      this.listOfVocherStoreTransation = await res;
    })
  }
  async getStoreTransfer() {
    this.storeTransferService.getAllStoreTransfer().subscribe(async res => {
      this.listOfStoreTransfer = await res;
    })
  }
  Transaction_Type() {
    let r1 = {
      id: '1',
      name: 'Sales order'
    }
    this.ListoftranscationType.push(r1);
    let r2 = {
      id: '2',
      name: 'Case sales'
    }
    this.ListoftranscationType.push(r2);
    let r3 = {
      id: '3',
      name: 'purchase order'
    }
    this.ListoftranscationType.push(r3);
    let r4 = {
      id: '4',
      name: 'Good receive'
    }
    this.ListoftranscationType.push(r4);
    let r5 = {
      id: '5',
      name: 'Store transfer'
    }
    this.ListoftranscationType.push(r5);
  }
  TransactionType(ev) {
    this.listOfVoucherTransaction = [];
    this.stockAdjustment.getAllStockAdjustment().subscribe(res => {
      let stock = res.filter(c => c.transactionType == ev.target.value && c.itemId == this.data.id);
      if (this.listOfLookup != undefined) {
        stock.forEach(element => {
          let data = {
            Transaction_type: element.transactionType,
            Order_Number: element.transactionNumber,
            Date: element.date,
            Quantity: element.Quantity,
            Store: this.listOfLookup.find(c => c.id == element.store).name,
            Qty_Before: element.QuantityBefore,
            After_Qty: element.QuantityAfter
          }
          this.listOfVoucherTransaction.push(data);
        });
      }
      else {
        this.refresh(ev);
      }
    })
  }
  refresh(ev) {
    this.getLineItem();
    this.TransactionType(ev);
  }
  Store(ev) {
    this.listOfVoucherTransaction = [];
    let storeId = this.listOfLookup.find(c => c.name == ev.target.value).id
    this.stockAdjustment.getAllStockAdjustment().subscribe(async res => {
      let stock = await res.filter(c => c.store == storeId && c.itemId == this.data.id);
      stock.forEach(element => {
        let data = {
          Transaction_type: element.transactionType,
          Order_Number: element.transactionNumber,
          Date: element.date,
          Quantity: element.quantity,
          Store: this.listOfLookup.find(c => c.id == element.store).name,
          Qty_Before: element.quantityBefore,
          After_Qty: element.quantityAfter
        }
        this.listOfVoucherTransaction.push(data);
      });
    })
  }
  getItemsHistory() {
    this.stockAdjustment.getAllStockAdjustment().subscribe(async res => {
      let stock = await res.filter(c => c.itemId == this.data.id);
      if (this.listOfLookup != undefined) {
        stock.forEach(element => {
          let data = {
            id: this.data.id,
            Transaction_type: element.transactionType,
            Order_Number: element.transactionNumber,
            Date: element.date,
            Quantity: element.quantity,
            Store: this.listOfLookup.find(c => c.id == element.store).name,
            Qty_Before: element.quantityBefore,
            After_Qty: element.quantityAfter
          }
          this.listOfVoucherTransaction.push(data);
        });
      }
      else {
        this.getRefresh();
      }
    })
  }
  detailItemTransation(event) {
    let transactionType = event.key.Order_Number;
    this.transactionType = transactionType.substring(0, 2);
    if (this.transactionType == "GR" || this.transactionType == "CS" || this.transactionType == "PO" || this.transactionType == "SO") {
      let data = {
        id: event.key.id,
        Order_Number: event.key.Order_Number,
        date: event.key.Date
      }
      this.modalController.dismiss();
      this.sharedService.voucherNumber.next(data);
      this.router.navigate(['/menu/vocher']);
      if (this.transactionType == "CS") {
        let voucher = {
          id: 4,
          name: "Cash Sales"
        }
        this.sharedService.VoucherTypeId.next(voucher);
        this.sharedService.voucherNumber.next(data);
      }
      else if (this.transactionType == "GR") {
        let voucher = {
          id: 1,
          name: "Good Recieve"
        }
        this.sharedService.VoucherTypeId.next(voucher);
        this.sharedService.voucherNumber.next(data);
      }
      else if (this.transactionType == "PO") {
        let voucher = {
          id: 5,
          name: "Purchase order"
        }
        this.sharedService.VoucherTypeId.next(voucher);
        this.sharedService.voucherNumber.next(data);
      }
      else if (this.transactionType == "SO") {
        let voucher = {
          id: 3,
          name: "Sale order"
        }
        this.sharedService.VoucherTypeId.next(voucher);
        this.sharedService.voucherNumber.next(data);
      }

    }
    else if (this.transactionType == "SA") {
      this.modalController.dismiss();
      this.router.navigate(['/menu/items']);
      let data = {
        id: event.key.id,
        quantity: event.key.Quantity,
        store: event.key.Store
      }
      this.sharedService.itemsId.next(data);
    }
    else if (this.transactionType == "ST") {
      this.modalController.dismiss();
      this.router.navigate(['/menu/store-transfer']);
      let data = {
        id: event.key.id,
        Order_Number: event.key.Order_Number,
        date: event.key.Date
      }
      this.sharedService.TranscationType.next(data);
    }
  }
  getRefresh() {
    this.getLookup();
    this.getItemsHistory()
  }
}


