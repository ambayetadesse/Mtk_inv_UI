import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertController, IonContent, LoadingController, ModalController, Platform } from '@ionic/angular';
import { DxDataGridComponent, DxLookupComponent } from 'devextreme-angular';
import { Lookup } from 'src/Tabels/tabels-list';
import { ItemsPage } from '../items/items.page';
import { CountSheetService } from '../Service/count-sheet.service';
import { ItemsService } from '../Service/items.service';
import { LineItemsService } from '../Service/line-items.service';
import { LookupService } from '../Service/lookup.service';
import { SharedService } from '../Service/shared.service';
import { StockAdjustmentService } from '../Service/stock-adjustment.service';
@Component({
  selector: 'app-count-sheet',
  templateUrl: './count-sheet.page.html',
  styleUrls: ['./count-sheet.page.scss'],
})
export class CountSheetPage implements OnInit {
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
  sheetNo: string = "0";
  listOfStockAdjustment: any[];
  loader: HTMLIonLoadingElement;
  newData: any;
  differenceQty: number;
  lengthOfSheet: number;
  showScroll: boolean = false;
  @ViewChild('pageTop') pageTop: IonContent
  public pageScroller() {
    this.pageTop.scrollToTop();
  }
  constructor(private fb: FormBuilder, private platform: Platform,
    private lookupService: LookupService, private modalController: ModalController,
    private itemsService: ItemsService, private lineItemsService: LineItemsService,
    private shardService: SharedService, private countSheetService: CountSheetService,
    private alertController: AlertController,
    private stockAdjustmentService: StockAdjustmentService,
    private loadingController: LoadingController) {
    //setting min date
    let date: Date = new Date();
    date.setDate(date.getDate() - 5);
    this.minDate = date.toISOString();
    //setting max date
    date = new Date();
    date.setDate(date.getDate() + 5);
    this.maxDate = date.toISOString();
  }
  async ngOnInit() {
    this.regform = this.fb.group({
      Location: ['', Validators.required],
      startdate: ['', Validators.required],
      enddate: ['', Validators.required],
      sheetNo: ['', Validators.required],
      item: []
    });
    if ((this.platform.is('mobile') && !this.platform.is('hybrid')) ||
      this.platform.is('desktop')) {
      this.usePicker = true;
    }
    this.getStockAdjustment();
    this.getLookup();
    this.getItems();
    this.getItemAddBySelected();
    this.readSheetNo();
  }
  scroll(ev) {
    const offset = ev.detail.scrollTop;
    this.showScroll = offset > 300;
  }
  readSheetNo() {
    this.lengthOfSheet = 0;
    this.countSheetService.getAllCountSheet().subscribe(async (result) => {
      if (result.length == 0) this.lengthOfSheet = 1;
      else this.lengthOfSheet = await result.length + 1;
      this.sheetNo = "0";
      let padStart = this.sheetNo.padStart(4, "0");
      this.sheetNo = "CS-" + padStart + this.lengthOfSheet;
    });
  }
  getLookup() {
    this.lookupService.getAllLookUp().subscribe(async res => {
      this.listOfLookup = await res.filter(c => c.type == 3);
    })
  }
  getItems() {
    this.itemsService.getAllItem().subscribe(async result => {
      // await this.loader.present().then();
      this.listofItems = await result;
    }, async (err) => {
      await this.loader.dismiss().then();
      console.log(err);
    })
  }
  getStockAdjustment() {
    this.stockAdjustmentService.getAllStockAdjustment().subscribe(async res => {
      this.listOfStockAdjustment = await res;
    })
  }
  getOrderQty($event) {
    this.lineItemsService.getAllLineItem().subscribe(async lineItemLists => {
      let lineItem = await lineItemLists.filter(c => c.itemId == $event)
      this.orderQty = 0;
      lineItem.forEach(ele => {
        let voucherTypeId = ele.vocherId
        let vocherTypeId = voucherTypeId.substring(0, 2);
        if (vocherTypeId == "GR" || "PO") {
          this.orderQty += ele.Quantity;
        }
      });
    })
  }
  getItemAddBySelected() {
    this.shardService.listOfItemAdd.subscribe(async result => {
      await result.forEach(el => {
        this.orderQty;
        let itemid = el.id
        let qty = this.listofItems.find(c => c.id == itemid).quantity;
        // console.log(resevedQty);
        let value = {
          id: this.listofItems.find(c => c.id == itemid).id,
          name: this.listofItems.find(c => c.id == itemid).name,
          discrption: this.listofItems.find(c => c.id == itemid).discrption,
          Counted_Qty: this.orderQty,
          system_Qty: qty
        }
        this.ListOfItems.push(value);
      });
    });

  }
  valueChanged($event) {
    this.orderQty;
    this.selectedLookupId = $event.value;
    let qty = this.listofItems.find(c => c.id == $event.value).quantity;
    let oldid = this.listofItems.find(c => c.id == $event.value).id;
    let id = this.ListOfItems.find(c => c.id == oldid);
    if (id) {

    }
    else {
      let value = {
        id: this.listofItems.find(c => c.id == $event.value).id,
        name: this.listofItems.find(c => c.id == $event.value).name,
        discrption: this.listofItems.find(c => c.id == $event.value).discrption,
        Counted_Qty: this.orderQty,
        system_Qty: qty
      }
      this.ListOfItems.push(value);
    }
    //this.regform.get("item").reset();
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
        data: this.ListOfItems
      }
    });
    return await modal.present().then(_ => {
      // triggered when opening the modal
      // console.log('Sending: ',this.values);
      // console.log('Sending: ',this.defaultSelectedCurrency);
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
      // triggered when opening the modal
      // console.log('Sending: ',this.values);
      // console.log('Sending: ',this.defaultSelectedCurrency);
    });
  }
  selectionChangedRow(data: any) {
    this.selectedItemKeys = data.selectedRowKeys;
  }
  selectionChanged(data: any) {
    this.isenabled = true;
    this.isAddItems = true;
    let counted_Qty = data.newData.Counted_Qty;
    this.olddata = [];
    this.olddata = data.oldData;
    this.newData = data.newData;
    let findid = this.listOfData.find(c => c.id === this.olddata.id);
    if (!findid) {
      let datalist = {
        id: this.olddata.id,
        Counted_Qty: counted_Qty,
        discrption: this.olddata.discrption,
        name: this.olddata.name,
        system_Qty: this.olddata.system_Qty,
        Difference: this.olddata.OldQuantity - this.newData.NewQuantity
      }
      this.listOfData.push(datalist);
    }
    else {
      let i = this.listOfData.findIndex(x => x.id === findid.id);
      this.listOfData.splice(i, 1);
      let datalist = {
        id: findid.id,
        Counted_Qty: counted_Qty,
        discrption: findid.discrption,
        name: findid.name,
        system_Qty: findid.system_Qty
      }
      this.listOfData.push(datalist);
      // console.log(this.listOfData);
    }
  }
  deleteRecords() {
    this.selectedItemKeys.forEach((index) => {
      let i = this.ListOfItems.findIndex(x => x.id === index.id);
      this.ListOfItems.splice(i, 1);
    });
    // this.dataGrid.instance.refresh();
  }
  async getReadSheet() {
    this.sheetNo = "0";
    let padStart = this.sheetNo.padStart(4, "0");
    this.sheetNo = "CS-" + padStart + this.lengthOfSheet;
  }
  calculateCountSheet() {
    this.editMode = true
    this.isenabled = true;
    this.isAddItems = false;
    if (this.regform.valid) {
      if (this.calculateSheet == false) {
        this.listOfData.forEach(el => {
          let data = {
            Counted_Qty: el.Counted_Qty,
            discrption: el.discrption,
            name: el.name,
            system_Qty: el.system_Qty,
            Defference_Qty: el.system_Qty - (+el.Counted_Qty)
          }
          this.defferenceData.push(data);
          this.calculateSheet = true;
          this.listOfItemsData = false;
          let storeid = this.regform.get("Location").value
          this.differenceQty = el.system_Qty - (+el.Counted_Qty);
          let countSheetdataList = {
            itemId: el.id,
            sheetNo: this.sheetNo,
            startDate: this.currentDate,
            endDate: this.selectedDate,
            storeId: storeid,
            countQty: +el.Counted_Qty,
            systemQty: el.system_Qty,
            differenceQty: this.differenceQty
          }
          this.lengthOfSheet++;
          this.getReadSheet();
          this.countSheetService.create(countSheetdataList).subscribe(res => {
            console.log(res.toString());
          });
          let stockAdjust = this.listOfStockAdjustment.find(c => c.itemId == el.id && c.store == storeid)
          let addStock = {
            transactionType: "Count Sheet",
            transactionNumber: this.sheetNo,
            itemId: stockAdjust.itemId,
            store: stockAdjust.store,
            QuantityBefore: stockAdjust.quantityAfter,
            QuantityAfter: +el.Counted_Qty,
            Quantity: - this.differenceQty,
            date: this.currentDate
          }
          this.stockAdjustmentService.create(addStock).subscribe(res => {
            console.log(res.toString());
          });
        });
       this.presentAlert();
      }
      else {
        this.listOfItemsData = true;
        this.calculateSheet = false;
        this.isAddItems = true;
        this.editMode = false;
      }
    }
    else {
      this.ErrorAlert();
    }
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Count Sheet',
      // subHeader: 'Subtitle',
      message: 'successfully.',
      buttons: ['OK']
    });
    await alert.present();
  }
  async ErrorAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      // subHeader: 'Subtitle',
      message: 'Please Enter All field.',
      buttons: ['OK']
    });

    await alert.present();
  }
}
