import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertController, IonContent, Platform } from '@ionic/angular';
import { element } from 'protractor';
import { Lookup, Items, ItemCategory, AddStock } from 'src/Tabels/tabels-list';
import { AddStockService } from '../Service/add-stock.service';
import { ItemCategoryService } from '../Service/item-category.service';
import { ItemsService } from '../Service/items.service';
import { LookupService } from '../Service/lookup.service';
import { StockAdjustmentService } from '../Service/stock-adjustment.service';
@Component({
  selector: 'app-count-stock',
  templateUrl: './count-stock.page.html',
  styleUrls: ['./count-stock.page.scss'],
})
export class CountStockPage implements OnInit {
  regform = this.fb.group({});
  usePicker: boolean;
  listOfLookup: Lookup[];
  listofItems: any[];
  listOfCatagory: ItemCategory[];
  listOfCountStock: any[] = [];
  itemSelectedId: any[] = [];
  listOfData: AddStock[];
  storeId: number;
  catagoryId: number;
  itemId: number;
  loader: any;
  showScroll: boolean = false
  @ViewChild('pageTop') pageTop: IonContent
  public pageScroller() {
    this.pageTop.scrollToTop()
  }
  constructor(private fb: FormBuilder, private platform: Platform,
    private lookupService: LookupService, private itemsService: ItemsService,
    private itemCategoryService: ItemCategoryService,
    private stockAdjustmentService: StockAdjustmentService,
    private alertController: AlertController) { }
  ngOnInit() {
    this.regform = this.fb.group({
      location: ['', Validators.required],
      catagory: ['', Validators.required],
      item: ['', Validators.required]
    });
    if ((this.platform.is('mobile') && !this.platform.is('hybrid')) ||
      this.platform.is('desktop')) {
      this.usePicker = true;
    }
    this.getItems();
    this.getLookup();
    this.getCatagory();
    this.getCountStock()
  }
  scroll(ev) {
    const offset = ev.detail.scrollTop
    this.showScroll = offset > 300;
  }
  getDisplayExpr(item) {
    if (!item) {
      return "";
    }
    return item.name;
  }
  getDisplayCatagory(catagory) {
    if (!catagory) {
      return "";
    }
    return catagory.categoryName;
  }
  getLookup() {
    this.lookupService.getAllLookUp().subscribe(async res => {
      this.listOfLookup = await res.filter(c => c.type == 3);
    }, async (error) => {
      await this.loader.dismiss().then();
      console.log(error);
    });
  }
  getItems() {
    this.itemsService.getAllItem().subscribe(async result => {
      this.listofItems = await result;
    }, async (error) => {
      //await this.loader.dismiss().then();
      console.log(error);
    });
  }
  getCatagory() {
    this.itemCategoryService.getAllItemCategories().subscribe(async catagory => {
      this.listOfCatagory = await catagory;
    }, async (error) => {
      await this.loader.dismiss().then();
      console.log(error);
    });
  }
  valueChangeItem(ev) {
    this.itemId = ev.value;
    this.listOfCountStock = [];
    this.stockAdjustmentService.getAllStockAdjustment().subscribe(async datalist => {
      if (datalist.length > 0) {
        let items = this.listofItems.find(c => c.id == ev.value)
        this.listOfLookup.forEach(element => {
          let stock = datalist.find(c => c.store == element.id && c.itemId == items.id);
          let catagoryId = this.listofItems.find(c => c.id == items.id).catagoryId;
          if (stock !== undefined) {
            let data = {
              id: items.id,
              item: this.listofItems.find(c => c.id === items.id).name,
              Amharic_Name: items.amaricName,
              Catagory: this.listOfCatagory.find(c => c.id == catagoryId).categoryName,
              Quantity: stock.quantityAfter,
              Location: this.listOfLookup.find(c => c.id === stock.store).name,
            }
            this.listOfCountStock.push(data);
          }
        });
        if (this.storeId !== undefined) {
          let storeName = this.listOfLookup.find(c => c.id == this.storeId).name
          this.listOfCountStock = this.listOfCountStock.filter(c => c.Location === storeName);
        }
        if (this.catagoryId !== undefined) {
          let catagoryName = this.listOfCatagory.find(c => c.id == this.catagoryId).categoryName
          this.listOfCountStock = this.listOfCountStock.filter(c => c.Catagory === catagoryName);
        }
      }
      else {
        this.AlertInternet();
      }
    }, async (error) => {
      await this.loader.dismiss().then();
      console.log(error);
    });
  }
  valueChangeStore(ev) {
    this.storeId = ev.value;
    this.listOfCountStock = [];
    this.stockAdjustmentService.getAllStockAdjustment().subscribe(async datalist => {
      if (datalist.length > 0) {
        this.listofItems.forEach(ele => {
          let stock = datalist.find(c => c.store == ev.value && c.itemId == ele.id);
          let catagoryId = this.listofItems.find(c => c.id == ele.id).catagoryId;
          if (stock !== undefined) {
            let data = {
              id: ele.id,
              item: this.listofItems.find(c => c.id === ele.id).name,
              Amharic_Name: ele.amaricName,
              Catagory: this.listOfCatagory.find(c => c.id == catagoryId).categoryName,
              Quantity: stock.quantityAfter,
              Location: this.listOfLookup.find(c => c.id === stock.store).name,
            }
            this.listOfCountStock.push(data);
          }
        })
        if (this.itemId !== undefined) {
          this.listOfCountStock = this.listOfCountStock.filter(c => c.id === this.itemId);
        }
        if (this.catagoryId !== undefined) {
          let catagoryName = this.listOfCatagory.find(c => c.id == this.catagoryId).categoryName
          this.listOfCountStock = this.listOfCountStock.filter(c => c.Catagory === catagoryName);
        }
      }
      else {
        this.AlertInternet();
      }
    }, async (error) => {
      await this.loader.dismiss().then();
      console.log(error);
    });
  }
  valueChangeCatagory(ev) {
    this.catagoryId = ev.value
    this.listOfCountStock = [];
    this.stockAdjustmentService.getAllStockAdjustment().subscribe(async datalist => {
      if (datalist.length > 0) {
        this.listofItems.forEach(ele => {
          this.listOfLookup.forEach(element => {
            let stock = datalist.find(c => c.store == element.id && c.itemId == ele.id);
            let catagoryId = this.listofItems.find(c => c.id == ele.id).catagoryId;
            if (stock !== undefined) {
              let data = {
                id: ele.id,
                item: this.listofItems.find(c => c.id === ele.id).name,
                Amharic_Name: ele.amaricName,
                Catagory: this.listOfCatagory.find(c => c.id == catagoryId).categoryName,
                Quantity: stock.quantityAfter,
                Location: this.listOfLookup.find(c => c.id === stock.store).name,
              }
              this.listOfCountStock.push(data);
            }
          });
        })
        let catagoryName = this.listOfCatagory.find(c => c.id == ev.value).categoryName
        this.listOfCountStock = this.listOfCountStock.filter(c => c.Catagory === catagoryName);
        if (this.storeId !== undefined) {
          let storeName = this.listOfLookup.find(c => c.id == this.storeId).name
          this.listOfCountStock = this.listOfCountStock.filter(c => c.Location === storeName);
        }
        if (this.itemId !== undefined) {
          this.listOfCountStock = this.listOfCountStock.filter(c => c.id === this.itemId);
        }
      }
      else {
        this.AlertInternet();
      }
    }, async (error) => {
      await this.loader.dismiss().then();
      console.log(error);
    });
  }
  getCountStock() {
    this.stockAdjustmentService.getAllStockAdjustment().subscribe(async datalist => {
      if (datalist.length > 0 && this.listofItems != undefined) {
        this.listofItems.forEach(ele => {
          this.listOfLookup.forEach(element => {
            let stock = datalist.find(c => c.store == element.id && c.itemId == ele.id);
            let catagoryId = this.listofItems.find(c => c.id == ele.id).catagoryId;
            if (stock !== undefined) {
              let data = {
                id: ele.id,
                item: this.listofItems.find(c => c.id === ele.id).name,
                Amharic_Name: ele.amaricName,
                Catagory: this.listOfCatagory.find(c => c.id == catagoryId).categoryName,
                Quantity: stock.quantityAfter,
                Location: this.listOfLookup.find(c => c.id === stock.store).name,
              }
              this.listOfCountStock.push(data);
            }
          });
        })
      }
      else {
        this.getItems();
        this.getCountStock();
      }
    }, async (error) => {
      await this.loader.dismiss().then();
      console.log(error);
    });
  }
  async AlertInternet() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Internet',
      // subHeader: 'Subtitle',
      message: 'Please turn on wifi or data',
      buttons: ['OK']
    });
    await alert.present();
  }
}
