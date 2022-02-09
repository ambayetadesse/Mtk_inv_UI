import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertController, IonContent, ModalController, Platform } from '@ionic/angular';
import { DxDataGridComponent, DxLookupComponent } from 'devextreme-angular';
import { ItemLocation, Items, ItemStoreBalance, Lookup, StockAdjustment } from 'src/Tabels/tabels-list';
import { ItemsPage } from '../items/items.page';
import { AddStockService } from '../Service/add-stock.service';
import { BalanceService } from '../Service/balance.service';
import { ItemLocationService } from '../Service/item-location.service';
import { ItemsService } from '../Service/items.service';
import { LineItemsService } from '../Service/line-items.service';
import { LookupService } from '../Service/lookup.service';
import { SharedService } from '../Service/shared.service';
import { StockAdjustmentService } from '../Service/stock-adjustment.service';
@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.page.html',
  styleUrls: ['./add-stock.page.scss']
})
export class AddStockPage implements OnInit {
  @ViewChild("simpleLookup", { static: false }) simpleLookup: DxLookupComponent;
  currentDate = new Date().toISOString();
  selectedDate = new Date().toISOString();
  minDate = new Date().toISOString();
  maxDate = new Date().toISOString();
  regform = this.fb.group({});
  usePicker = false;
  listOfLookup: Lookup[];
  listofItems: any[];
  ListOfItems: any[] = [];
  searchText: string;
  currentIndex = -1;
  y: number;
  orderQty: number;
  selectedItemKeys: any[] = [];
  listOfData: any[] = [];
  olddata: any;
  calculateSheet: boolean = false;
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent;
  defferenceData: any[] = [];
  listOfItemsData: boolean = true;
  editMode: boolean = false;
  isenabled: boolean;
  isAddItems: boolean = true;
  selectedLookupId: string;
  newData: any;
  AddStockNo: string = "0";
  listOfStockAdjustment: any[];
  listOfItemLocation: ItemLocation[];
  listOfStoreBalance: ItemStoreBalance[];
  lengthOfStock: number;
  showScroll: boolean = false;
  @ViewChild('pageTop') pageTop: IonContent;
  public pageScroller() {
    this.pageTop.scrollToTop();
  }
 constructor(
			private fb: FormBuilder, 
			private platform: Platform,
			private lookupService: LookupService,
			private modalController: ModalController,
			private itemsService: ItemsService, 
			private lineItemsService: LineItemsService,
			private shardService: SharedService, 
			private addStockService: AddStockService,
			private stockAdjustmentService: StockAdjustmentService,
			private itemLocationService: ItemLocationService,
			private balanceService: BalanceService,
			private alertController: AlertController
	       ){
			//setting min date
			let date: Date = new Date();
			date.setDate(date.getDate() - 5);
			this.minDate = date.toISOString();
			//setting max date
			date = new Date();
			date.setDate(date.getDate() + 5);
			this.maxDate = date.toISOString();
           }
 ngOnInit() {
    this.regform = this.fb.group({
      location: ['', Validators.required],
      date: ['', Validators.required],
      addStockNo: ['', Validators.required],
      item: ['']
    });
    if ((this.platform.is('mobile') && !this.platform.is('hybrid')) ||
      this.platform.is('desktop')) {
      this.usePicker = true;
    }
    this.getLookup();
    this.getItems();
    this.getItemAddBySelected();
    this.readVoucherId();
    this.getStockAdjustment();
    this.getItemLocation();
    this.getStoreBalance();
  }
 scroll(ev) {
    const offset = ev.detail.scrollTop;
    this.showScroll = offset > 300;
}
 async getLookup() {
    this.lookupService.getAllLookUp().subscribe(async res => {
      this.listOfLookup = await res.filter(c => c.type == 3);
    })
  }
 async readVoucherId() {
    this.lengthOfStock = 0;
    this.addStockService.getAllAddStock().subscribe(async (result) => {
      if (result.length == 0) this.lengthOfStock = 1;
      else this.lengthOfStock = await result.length + 1;
      this.AddStockNo = "0";
      let padStart = this.AddStockNo.padStart(4, "0");
      this.AddStockNo = "SA-" + padStart + this.lengthOfStock;
    });
  }
 async getItems() {
    this.itemsService.getAllItem().subscribe(async result => {
      this.listofItems = await result;
    })
  }
 getStockAdjustment() {
    this.stockAdjustmentService.getAllStockAdjustment().subscribe(async res => {
      this.listOfStockAdjustment = await res;
    })
  }
 getItemLocation() {
    this.itemLocationService.getAllItemLocation().subscribe(async res => {
      this.listOfItemLocation = await res;
    })
  }
 getStoreBalance() {
    this.balanceService.getAllBalance().subscribe(async res => {
      this.listOfStoreBalance = await res;
    })
  }
 getItemAddBySelected() {
    this.shardService.listOfItemAdd.subscribe(async result => {
      await result.forEach(el => {
        let itemid = el.id
        let store = this.regform.get("location").value;
        let Qty = this.listOfStockAdjustment.find(c => c.itemId == itemid && c.store == store)
        let value = {
          id: this.listofItems.find(c => c.id == itemid).id,
          name: this.listofItems.find(c => c.id == itemid).name,
          discrption: this.listofItems.find(c => c.id == itemid).discrption,
          OldQuantity: Qty.quantityAfter,
          Difference: Qty.quantityAfter
        }
        this.ListOfItems.push(value);
      });
    })
  }
 valueChanged($event) {
    if ($event.value != null) {
      let itemid = this.listofItems.find(c => c.id == $event.value).id
      let store = this.regform.get("location").value;
      let Qty = this.listOfStockAdjustment.find(c => c.itemId == itemid && c.store == store)
      let value = {
        id: this.listofItems.find(c => c.id == $event.value).id,
        name: this.listofItems.find(c => c.id == $event.value).name,
        discrption: this.listofItems.find(c => c.id == $event.value).discrption,
        NewQuantity: 0,
        OldQuantity: Qty.quantityAfter,
        Difference: Qty.quantityAfter
      }
      this.ListOfItems.push(value);
    }
  }
 getDisplayExpr(item) {
    if (!item) {
      return "";
    }
    return item.name;
  }
 async addItems() {
    const modal = await this.modalController.create({
      component: ItemsPage,
      cssClass: 'my-custom',
      componentProps: {
        y: this.y = 2,
        data: this.ListOfItems,
        selectedLookupId: this.selectedLookupId
      }
    });
    return await modal.present().then(_ => {
    });
  }
 addItem = (e) => {
    this.isAddItems = true;
    this.crateItem();
    this.simpleLookup.instance.close();
  };
 Cancel = () => {
    this.simpleLookup.instance.close();
  };
 async crateItem() {
    const modal = await this.modalController.create({
      component: ItemsPage,
      cssClass: 'my-custom',
      componentProps: {
        y: this.y = 1
      }
    });
    return await modal.present().then(_ => {
    });
  }
 selectionChangedRow(data: any) {
    this.selectedItemKeys = data.selectedRowKeys;
  }
 selectionChanged(data: any) {
    this.isenabled = true;
    this.isAddItems = true;
    this.newData = data.newData;
    this.olddata = data.oldData;
    let findid = this.ListOfItems.find(c => c.id === this.olddata.id);
    let i = this.ListOfItems.findIndex(x => x.id === findid.id);
    this.ListOfItems.splice(i, 1);
    if (!findid) {
      let datalist = {
        id: this.olddata.id,
        name: this.olddata.name,
        discrption: this.olddata.discrption,
        NewQuantity: this.newData.NewQuantity,
        OldQuantity: this.olddata.OldQuantity,
        Difference: this.olddata.OldQuantity - this.newData.NewQuantity
      }
      this.ListOfItems.push(datalist);
    }
    else {
      let datalist = {
        id: this.olddata.id,
        name: this.olddata.name,
        discrption: this.olddata.discrption,
        NewQuantity: this.newData.NewQuantity,
        OldQuantity: this.olddata.OldQuantity,
        Difference: this.olddata.OldQuantity - this.newData.NewQuantity
      }
      this.ListOfItems.push(datalist);
    }
  }
 deleteRecords() {
    this.selectedItemKeys.forEach((index) => {
      let i = this.ListOfItems.findIndex(x => x.id === index.id);
      this.ListOfItems.splice(i, 1);
    });
  }
 async getReadStockLength() {
    this.AddStockNo = "0";
    let padStart = this.AddStockNo.padStart(4, "0");
    this.AddStockNo = "SA-" + padStart + this.lengthOfStock;
  }
 AddStock() {
    if (this.calculateSheet == false) {
      if (this.regform.valid) {
        this.ListOfItems.forEach(el => {
          let data = {
            itemId: this.listofItems.find(c => c.name === el.name).id,
            NewQuantity: el.NewQuantity,
            OldQuantity: el.OldQuantity,
            Difference: el.Difference,
            addStockNo: this.AddStockNo,
            date: this.regform.get("date").value,
            location: (this.regform.get("location").value).toString()
          }
          this.lengthOfStock++;
          this.getReadStockLength()
          this.addStockService.create(data).subscribe(res => {
            //console.log(res.toString());
          });
          //to add stock adjustment 
          let itemId = this.listofItems.find(c => c.name === el.name).id;
          let storeId = this.regform.get("location").value
          let stockAdjust = this.listOfStockAdjustment.find(c => c.itemId == itemId && c.store == storeId)
          let addStock = {
            transactionType: "Stock Adjustment",
            transactionNumber: this.AddStockNo,
            itemId: itemId,
            store: storeId,
            QuantityBefore: stockAdjust.quantityAfter,
            QuantityAfter: el.NewQuantity,
            Quantity: -el.Difference,
            date: this.currentDate
          }
          this.stockAdjustmentService.create(addStock).subscribe(res => {
            //console.log(res.toString());
          });
          //update items Quantity
          let item = this.listofItems.find(c => c.id == itemId);
          let itemData = {
            id: item.id,
            name: item.name,
            AmaricName: item.amaricName,
            discrption: item.discrption,
            CatagoryId: item.catagoryId,
            type: item.type,
            cost: item.cost,
            storeid: item.storeid,
            price: item.price,
            Quantity: el.NewQuantity,
            brand: item.brand,
            picture: item.picture,
            remark: item.remark,
          }
          this.itemsService.updateItem(itemData).subscribe(res => {
            //console.log(res.toString());
          });
          // update store balance Quantity
          let balanceStore = this.listOfStoreBalance.find(c => c.itemId == itemId && c.storeId == storeId)
          let balanceS = {
            id: balanceStore.id,
            itemId: balanceStore.itemId,
            beginingQuantity: balanceStore.beginingQuantity,
            currentQuantity: el.NewQuantity,
            storeId: balanceStore.storeId,
          }
          this.balanceService.updateBalance(balanceS).subscribe(res => {
            //console.log(res.toString());
          });
          //update item location 
          let itemL = this.listOfItemLocation.find(c => c.itemId == itemId && c.location == storeId)
          if (itemL != null) {
            let itemLocation = {
              id: itemL.id,
              itemId: itemL.itemId,
              location: itemL.location,
              quantity: el.NewQuantity
            }
            this.itemLocationService.updateItemLoaction(itemLocation).subscribe(res => {
             // console.log(res.toString());
              this.regform.get("location").reset();
            });
          }
        });
        this.presentAlert("Add success");
        this.regform.get("item").reset();
        this.ListOfItems = [];
      }
      else {
        this.presentAlert("Please enter all fields.");
      }
    }
    else {
      this.listOfItemsData = true;
      this.calculateSheet = false;
      this.isAddItems = true;
      this.editMode = false;
    }
 }
 async presentAlert(message) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Add Stock',
      // subHeader: 'Subtitle',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
 }
}
