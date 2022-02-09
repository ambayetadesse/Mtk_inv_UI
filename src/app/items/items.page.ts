import { LookupCatagoryService } from './../Service/lookup-catagory.service';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonContent, ModalController, Platform } from '@ionic/angular';
import { CatagoryService } from '../Service/catagory.service';
import { Plugins, CameraSource, CameraResultType } from '@capacitor/core';
import { ItemCategory, ItemLocation, Items, Lookup, LookupCatagory, StockAdjustment, vocherStoreTransation } from 'src/Tabels/tabels-list';
import { LookupService } from '../Service/lookup.service';
import { ItemsService } from '../Service/items.service';
import { ItemCategoryService } from '../Service/item-category.service';
import { BalanceService } from '../Service/balance.service';
import { SharedService } from '../Service/shared.service';
import { FilterPage } from './filter/filter.page';
import { SortPage } from './sort/sort.page';
import { element } from 'protractor';
import { ItemLocationService } from '../Service/item-location.service';
import { VoucherTransationService } from '../Service/voucher-transation.service';
import { ItemHistoryPage } from './item-history/item-history.page';
import { Router } from '@angular/router';
import { StockAdjustmentService } from '../Service/stock-adjustment.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
})
export class ItemsPage implements OnInit {
  @Input() public data;
  @Input() public selectedLookupId;
  @ViewChild('filePicker', { static: false }) filePickerRef: ElementRef<HTMLInputElement>;
  formdata: Items
  base64textString: string;
  usePicker = false;
  //form: FormGroup = new FormGroup({});
  regform: FormGroup = new FormGroup({});
  itemId: number;
  ListOfItemCategory: ItemCategory[];
  filteredItemCategory: ItemCategory[];
  listoflookup: Lookup[];
  listofItems: Items[];
  filteredLookUp: Lookup[];
  listofStore: Lookup[];
  editMode: boolean = false;
  listOfLookUpCatagory: LookupCatagory[];
  filteredItems: Items[];
  filteredItemsSearch: Items[];
  searchText: string;
  itemType: string = "Stocked product";
  SelectedCatagory: number;
  SelectedLookup: number;
  selectedStore: number;
  length: number;
  filteredItemsByLookup: Items[];
  itemLookupList: any;
  ItemId: number;
  res: any[];
  //paging declaration
  page = 1;
  count = 0;
  tableSize = 5;
  tableSizes = [3, 6, 9, 12];
  currentIndex = -1;
  listOfItemsSelected: Items[];
  isValid: boolean = true;
  listItems: boolean = true;
  x: number = 0;
  form: boolean = true;
  itemsMenu: boolean = true;
  closeButton: boolean = false;
  listItemsOfAdd: boolean = false;
  @Input() public y = 0;
  Storevalue: string;
  selectAllModeVlaue: string = "page";
  selectionModeValue: string = "all";
  arr_names: string[] = new Array();
  allMode: string;
  checkBoxesMode: string;
  selectedRows: any[];
  selectionChangedBySelectbox: boolean;
  prefix: string;
  listOfItemsNew: any[] = [];
  catagoryName: any[] = [];
  itemsList: any;
  listSelectedRows: Items[];
  tittleItems: boolean = true;
  tittleSelectItems: boolean = false;
  oldListOfItems: any[] = [];
  listSelectedRowsIndex: any[] = [];
  currentItemList: any;
  listOfItemsByStore: Items[];
  b: number;
  sortN: number = 0;
  sortName: any;
  listOfStore: any[] = [];
  subStore: string
  subQuantity: number
  subStoreData: any[] = [];
  subQ: any;
  value: number;
  Store: any[];
  storeV: boolean = false;
  listOfStoreData: any[] = [];
  subLocationV: boolean;
  id: number;
  filterToolbar: boolean;
  defaultStore = "AA Labu"
  regform1: FormGroup;
  itemStoreBalance: any[] = [];
  listOfItemLocation: ItemLocation[];
  itemLocationId: number;
  quantity: any;
  location1 = 6;//AA Cherkos
  location = 7;//AA Lebu
  quantity1: number = 0
  quantity2: number = 0
  defaultQty: number = 0
  locationId1: number
  locationId2: number
  Qty: number = 0;

  defaultStoreId: string;
  listOfStoreDatabase: Lookup[];
  AAlebu: string;
  AAchirkos: string;
  currentDate = new Date().toISOString();
  selectedDate = new Date().toISOString();
  minDate = new Date().toISOString();
  maxDate = new Date().toISOString();
  stockAdjustmentNo: string = "0";
  listOfStock: any[];
  dataOfItem: { id: number; name: any; AmaricName: any; discrption: any; CatagoryId: any; type: any; price: any; cost: any; Quantity: any; picture: any; storeid: string; brand: any; remark: any; };
  loader: any;
  showScroll: boolean = false;
  @ViewChild('pageTop') pageTop: IonContent;
  public pageScroller() {
    this.pageTop.scrollToTop()
  }
  constructor(private fb: FormBuilder, private platform: Platform,
    private CategoryService: CatagoryService,
    private ItemCategoryService: ItemCategoryService,
    private alertController: AlertController,
    private lookupService: LookupService,
    private itemsService: ItemsService,
    private balanceService: BalanceService,
    private lookupCatagoryService: LookupCatagoryService,
    private modelControler: ModalController,
    private shardService: SharedService,
    private itemLocationService: ItemLocationService,
    private stockAdjustmentService: StockAdjustmentService
  ) {
    this.allMode = 'allPages';
    this.checkBoxesMode = 'onClick'
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
    this.regform1 = this.fb.group({ name: [''], quantity: [''] })
    this.regform = this.fb.group({
      name: ['', Validators.compose([Validators.required, Validators.pattern("[a-zA-Z0-9 ]*")])],
      AmaricName: [''],
      discrption: [''],
      CatagoryId: ['', Validators.required],
      type: ['', Validators.required],
      cost: ['', Validators.required],
      price: ['', Validators.required],
      Quantity: ['', Validators.compose([Validators.required, Validators.pattern("[0-9]*")])],
      storeid: [''],
      brand: [''],
      picture: [''],
      remark: [''],
      location: [''],
      location1: [''],
      quantity1: [''],
      quantity2: [''],
      locationId1: [''],
      locationId2: [''],
      date: [''],
    });
    if ((this.platform.is('mobile') && !this.platform.is('hybrid')) ||
      this.platform.is('desktop')
    ) {
      this.usePicker = true;
    }
    this.getAllItemCategory();
    this.getCategory();
    this.getLookUp();
    this.getItemList();
    this.getLookUpCatagory();
    this.getItemBySelectedLookup();
    this.getItemListFromFilter();
    this.getItemListFromSort();
    this.getSortName();
    this.getStore();
    this.getAllItemLocation();
    this.readStockAdjustmentNo();
    this.getStockAdjustment();
    this.getFillData()
    // console.log(this.y);
    if (this.y == 0) {
      this.listItems = true
      this.itemsMenu = true
      this.closeButton = false
      this.form = true
      this.filterToolbar = true
    }
    else if (this.y == 1) {
      this.listItems = false
      this.itemsMenu = false
      this.closeButton = true
      this.form = true
      this.filterToolbar = false
    }
    else if (this.y == 2) {
      this.listItems = false
      this.itemsMenu = false
      this.tittleSelectItems = true;
      this.tittleItems = false
      this.closeButton = true
      this.form = false;
      this.listItemsOfAdd = true;
      this.filterToolbar = false
    }
  }
  public fields: Object = { text: 'name', value: 'name' };
  public watermark2: string = 'Select Store';
  public height: string = '250px';
  readStockAdjustmentNo() {
    this.stockAdjustmentNo = "0";
    let No = 0;
    this.itemsService.getAllItem().subscribe(async (result) => {
      if (result.length == 0) No = 1;
      else No = await result.length + 1;
      this.stockAdjustmentNo = "0";
      let padStart = this.stockAdjustmentNo.padStart(4, "0");
      this.stockAdjustmentNo = "SA-" + padStart + No;
    });
  }
  SelectedValue(event) {
    this.lookupService.getAllLookUp().subscribe(async result => {
      this.filteredLookUp = await result.filter((c) => c.type == event.target.value);
      this.itemsService.getItemByLookup(this.SelectedLookup).subscribe(res => {
        console.log(res);
        //  this.filteredItemsByLookup = res;
      })
    })
  }
  subLocationM(): FormArray {
    return this.regform.get("subLocation") as FormArray
  }
  newSubStore() {
    return this.fb.group({
      location: '',
      quantity: ''
    })
  }
  AddLocation() {
    this.storeV = true;
  }
  getStore() {
    this.lookupService.getAllLookUp().subscribe(async result => {
      let res = await result.filter(c => c.type == 3);
      this.listOfStoreDatabase = res;
      if (res.length > 0) {
        this.defaultStore = res[1].name;
        this.defaultStoreId = res[0].id
        this.AAchirkos = res[0].id
        this.AAlebu = res[1].id
        res.forEach(ele => {
          let qty = 0;
          let data = {
            location: ele.name,
            quantity: qty
          }
          this.listOfStore.push(data);
        })
      }
      console.log(this.listOfStore)
    })
  }
  onKey(locationObj, qtyObj, id) {
    this.Qty = 0;
    let location = locationObj
    let quantity = qtyObj
    let qty1 = this.regform.get("quantity1").value;
    let qty2 = this.regform.get("quantity2").value;
    let sum = qty1 + qty2;
    this.Qty = this.Qty + sum;
    if (location !== null) {
      let data = {
        id: id,
        location: location,
        quantity: quantity
      }
      let lid = this.itemStoreBalance.find(c => c.location == location);
      if (lid == undefined) {
        this.itemStoreBalance.push(data);
      }
      else {
        let index = this.itemStoreBalance.findIndex(x => x.location == location)
        this.itemStoreBalance.splice(index, 1);
        this.itemStoreBalance.push(data);
      }
    }
    else {
      //this.storeV = false;
    }
  }
  trackByFn(index: any, item: any) {
    return index;
  }
  getItemsLocation(id: number) {
    this.itemStoreBalance.forEach(element => {
      let dataObj = {
        itemId: id,
        location: element.location,
        quantity: element.quantity
      }
      this.itemLocationService.create(dataObj).subscribe(async res => {
        console.log(res.toString())
      });
      //Add stock Adjustment
      let stock = {
        transactionType: "Stock Adjustment",
        transactionNumber: this.stockAdjustmentNo,
        itemId: id,
        store: element.location,
        QuantityBefore: 0,
        QuantityAfter: element.quantity,
        Quantity: element.quantity,
        date: this.currentDate
      }
      this.stockAdjustmentService.create(stock).subscribe(res => {
        console.log(res.toString());
      })
    })
  }
  getSortName() {
    this.shardService.sortName.subscribe(res => {
      this.sortName = res;
    })
  }
  getDisplayExpr(item) {
    if (!item) {
      return "";
    }
    return item.name;
  }
  getLookUpCatagory() {
    this.lookupCatagoryService.getAllLookupCatagory().subscribe(async result => {
      if (await result.length > 0) {
        this.listOfLookUpCatagory = await result;
        this.SelectedLookup = this.listOfLookUpCatagory[0].id
      }
      else {
        this.AlertInternet();
      }
    })
  }
  getItemBySelectedLookup() {
    this.lookupCatagoryService.getAllLookupCatagory().subscribe(async result => {
      if (await result.length > 0) {
        this.listOfLookUpCatagory = await result;
        this.SelectedLookup = this.listOfLookUpCatagory[0].id
      }
      else {
        this.AlertInternet();
      }
    })
  }
  getLookUp() {
    try {
      this.lookupService.getAllLookUp().subscribe(async result => {
        if (await result.length > 0) {
          this.listoflookup = await result;
          this.filteredLookUp = await result;
          this.selectedStore = this.filteredLookUp[0].id;
        }
        else {
          this.AlertInternet();
        }
      }
      );
    }
    catch (error) {
      console.log(error);
    }
  }
  getStoreByName(id: number) {
    this.lookupService.getAllLookUp().subscribe(async result => {
         this.listofStore = await result.filter(c => c.type == id);
      }
    )
  }
  getCategory() {
    this.CategoryService.getAllLookUpCategory().subscribe(async result => {
      if (await result.length > 0) {
        let store = await result.find(c => c.name == 'Store');
        if (store) {
          this.getStoreByName(store.id);
        }
      }
      else {
        this.AlertInternet();
      }
    })
  }
  getAllItemCategory() {
    this.ItemCategoryService.getAllItemCategories().subscribe(async result => {
      if (await result.length > 0) {
        this.ListOfItemCategory = await result;
        this.SelectedCatagory = this.ListOfItemCategory[1].id;
        this.ListOfItemCategory.forEach(element => {
          this.catagoryName.push(element.categoryName);
        })
      }
      else {
        this.AlertInternet();
      }
    }
    );
  }
  getAllItemLocation() {
    this.itemLocationService.getAllItemLocation().subscribe(async res => {
      this.listOfItemLocation = await res;
    })
  }
  getItemList() {
    this.itemsService.getAllItem().subscribe(async result => {
      if (result.length > 0) {
        this.listofItems = await result;
      // console.log(this.listofItems)
      }
      else {
        this.AlertInternet();
      }
    }, async (err) => {
      await this.loader.dismiss().then();
      console.log(err);
    });
  }
  getItemListFromFilter() {
    this.shardService.listOfItemsFromFilter.subscribe(async re => {
      this.listofItems = await re;
    }, async (err) => {
      await this.loader.dismiss().then();
      console.log(err);
    })
  }
  getItemListFromSort() {
    this.shardService.listOfItems.subscribe(async res => {
      this.listofItems = await res;
      this.sortN = 1;
    }, async (err) => {
      await this.loader.dismiss().then();
      console.log(err);
    })
  }
  getItemListByStoreId() {
    this.itemsService.getAllItem().subscribe(async res => {
      this.listOfItemsByStore = await res.find(c => c.storeid == this.selectedLookupId);
    }, async (err) => {
      await this.loader.dismiss().then();
      console.log(err);
    })
  }
  getStockAdjustment() {
    this.stockAdjustmentService.getAllStockAdjustment().subscribe(async res => {
      this.listOfStock = await res
    }, async (err) => {
      await this.loader.dismiss().then();
      console.log(err);
    })
  }
  getItemListAfterSave(id: number) {
    let itemId = id;
    this.b = 0;
    this.itemsService.getAllItem().subscribe(async res => {
       let a = await res.find(c => c.id == itemId);
      let id = await res.find(c => c.id == itemId).id;
      if (a ! = undefined && this.b == 0) {
        this.itemStoreBalance.forEach(ele => {
          let balance = {
            id: id,
            itemId: this.listofItems.find(c => c.id == id).id,
            beginingQuantity: ele.quantity,
            currentQuantity: ele.quantity,
            storeId: ele.location,
          }
          this.balanceService.updateBalance(balance).subscribe(res => {
            console.log(res.toString());
          });
          this.b = this.b + 1;
        });
      }
      else if (this.b == 0) {
        this.itemStoreBalance.forEach(ele => {
          let balance = {
            itemId: this.listofItems.find(c => c.id == id).id,
            beginingQuantity: ele.quantity,
            currentQuantity: ele.quantity,
            storeId: ele.location,
          }
          this.balanceService.create(balance).subscribe(res => {
            console.log(res.toString());
          });
          this.b++;
        })
      }
    });
  }
  onOptionsSelected($event) {
    this.lookupService.getAllLookUp().subscribe(async result => {
      console.log(result)
      this.listoflookup = await result.find(c => c.type == $event.target.value);
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
  onPickImage() {
    if (this.usePicker == true) {
      // if (!Capacitor.isPluginAvailable('Camera')) {
      this.filePickerRef.nativeElement.click();
      return;
    }
    Plugins.Camera.getPhoto({
      quality: 50,
      source: CameraSource.Prompt,
      correctOrientation: true,
      height: 100,
      width: 100,
      resultType: CameraResultType.Base64
    })
      .then(image => {
        this.base64textString = 'data:image/png;base64,' + image.base64String;
      })
      .catch(error => {
        console.log(error);
        if (this.usePicker) {
          this.filePickerRef.nativeElement.click();
        }
        return false;
      });
  }
  onFileChosen(event: Event) {
    const pickedFile = (event.target as HTMLInputElement).files[0];
    if (!pickedFile) {
      return;
    }
    const fr = new FileReader();
    fr.onload = () => {
      const dataUrl = fr.result.toString();
      this.base64textString = dataUrl;
    };
    fr.readAsDataURL(pickedFile);
  }
  filter(query) {
    this.filteredItemsSearch = (query.target.value) ?
      this.listofItems.filter(p => p.name.toLowerCase().includes(query.target.value.toLowerCase())) :
      this.listofItems;
  }
  validateForm(formData: Items) {
    this.isValid = true;
    if (formData.price == 0)
      this.isValid = false;
    else if (formData.quantity == 0)
      this.isValid = false;
    return this.isValid;
  }
  Save() {
    if (this.base64textString !== undefined) {
      this.regform.get('picture').setValue(this.base64textString);
    }
    if (this.regform.valid) {
      if (!this.itemId) {
        let dataOfItem = {
          name: this.regform.get("name").value,
          AmaricName: this.regform.get("AmaricName").value,
          discrption: this.regform.get("discrption").value,
          CatagoryId: this.regform.get("CatagoryId").value,
          type: this.regform.get("type").value,
          price: this.regform.get("price").value,
          cost: this.regform.get("cost").value,
          Quantity: this.regform.get("Quantity").value,
          picture: this.regform.get('picture').value,
          storeid: this.defaultStoreId,
          brand: this.regform.get("brand").value,
          remark: this.regform.get("remark").value,
        }
        this.itemsService.create(dataOfItem).subscribe(res => {
          this.getItemList()
          this.itemsService.getAllItem().subscribe(res => {
            this.listofItems = res;
            this.id = res[0].id;
            this.getItemsLocation(this.id);
            this.getItemListAfterSave(this.id);
            if (this.y == 1) {
              let itemsList = {
                id: this.id,
                name: this.regform.get('name').value,
                description: this.regform.get('discrption').value
              }
              this.shardService.itemsList.next(itemsList);
              this.modelControler.dismiss();
            }
          })
        });
        this.presentAlert();
      }
      else {
        this.dataOfItem = {
          id: this.itemId,
          name: this.regform.get("name").value,
          AmaricName: this.regform.get("AmaricName").value,
          discrption: this.regform.get("discrption").value,
          CatagoryId: +(this.regform.get("CatagoryId").value),
          type: this.regform.get("type").value,
          price: this.regform.get("price").value,
          cost: this.regform.get("cost").value,
          Quantity: this.regform.get("Quantity").value,
          picture: this.regform.get('picture').value,
          storeid: this.defaultStoreId,
          brand: this.regform.get("brand").value,
          remark: this.regform.get("remark").value,
        }
        this.itemsService.updateItem(this.dataOfItem).subscribe(res => {
          console.log(res.toString())
          this.getItemList()
        });
        let itemLocation = this.listOfItemLocation.find(c => c.itemId == this.itemId)
        this.itemStoreBalance.forEach(element => {
          let data = {
            itemId: this.itemId,
            location: element.location,
            quantity: element.quantity
          }
          if (element.id == undefined) {
            this.itemLocationService.create(data).subscribe(res => {
              console.log(res.toString())
            });
            //Add stock Adjustment
            let stocks = this.listOfStock.find(c => c.itemId == this.itemId)
            let stock = {
              transactionType: "Stock Adjustment",
              transactionNumber: this.stockAdjustmentNo,
              itemId: this.itemId,
              store: element.location,
              QuantityBefore:0,
              QuantityAfter: element.quantity,
              Quantity: element.quantity,
              date: this.currentDate
            }
            this.stockAdjustmentService.create(stock).subscribe(res => {
              console.log(res.toString());
            })
          }
          else {
            if (itemLocation == undefined) {
              this.itemLocationService.create(data).subscribe(res => {
                console.log(res.toString());
              });
            }
            else {
              let data = {
                id: element.id,
                itemId: this.itemId,
                location: element.location,
                quantity: element.quantity
              }
              this.itemLocationService.updateItemLoaction(data).subscribe(res => {
                console.log(res.toString());
              })
            }
            //Add stock Adjustmen
            let stocks = this.listOfStock.find(c => c.itemId == this.itemId && c.store == element.location)
            let stock = {
              transactionType: "Stock Adjustment",
              transactionNumber: this.stockAdjustmentNo,
              itemId: this.itemId,
              store: element.location,
              QuantityBefore: stocks.quantityAfter,
              QuantityAfter: element.quantity,
              Quantity: element.quantity,
              date: this.currentDate
            }
            this.stockAdjustmentService.create(stock).subscribe(res => {
              console.log(res.toString());
            })
          }
        });
        this.getItemListAfterSave(this.itemId);
        this.presentAlert();
      }
      if (this.y == 0) {
        this.storeV = false
        this.base64textString = '';
        this.regform.get("name").reset(),
          this.regform.get("AmaricName").reset(),
          this.regform.get("discrption").reset(),
          this.regform.get("CatagoryId").reset(),
          this.regform.get("type").reset(),
          this.regform.get("price").reset(),
          this.regform.get("cost").reset(),
          this.regform.get("Quantity").reset(),
          this.regform.get('picture').reset(),
          //this.defaultStoreId,
          this.regform.get("brand").reset(),
          this.regform.get("remark").reset(),
          //this.regform.reset();
          this.subLocationV = false;
        this.itemId = null;
        this.getCategory();
      }
    }
    else {
      this.ErrorAlert();
    }
  }
  delete(item: Items) {
    this.presentAlertConfirm(item)
  }
  async presentAlertConfirm(item: Items) {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: '<strong>Are you sure you want delete?</strong>',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'OK',
          handler: () => {
            this.itemsService.removeItems(item.id).subscribe(res => {
              console.log(res.toString())
            });
            this.regform.reset();
            this.itemId = null;
          }
        }
      ]
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
  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Item',
      message: 'Items Saved successfully.',
      buttons: ['OK']
    });
    await alert.present();
  }
  Edit(item: Items) {
    this.editMode = true;
    this.itemId = item.id;
    // let name = this.listOfStoreDatabase.find(c => c.id == item.storeid).name
    this.regform.get('name').setValue(item.name);
    this.regform.get('AmaricName').setValue(item.amaricName);
    this.regform.get('type').setValue(item.type);
    this.regform.get('discrption').setValue(item.discrption);
    this.regform.get('CatagoryId').setValue(item.catagoryId);
    this.regform.get('price').setValue(item.price);
    this.regform.get('cost').setValue(item.cost);
    this.regform.get('Quantity').setValue(item.quantity);
    //this.regform.get('storeid').setValue(name);
    this.regform.get('brand').setValue(item.brand);
    this.regform.get('remark').setValue(item.remark);
    //this.regform.get('subLocation').patchValue(item.subLocation);
    this.base64textString = item.picture;
    this.listOfStore = []
    let itemLocationId = this.listOfItemLocation.find(c => c.itemId == this.itemId)
    if (itemLocationId !== undefined) {
      this.subLocationV = true;
      this.itemLocationId = itemLocationId.itemId;
      let dataOfItemL = this.listOfItemLocation.filter(c => c.itemId == this.itemLocationId)
      dataOfItemL.forEach(ele => {
        let data = {
          id: ele.id,
          location: ele.location,
          quantity: ele.quantity
        }
        if (ele.location == this.location1) {
          this.regform.get("location1").setValue(ele.location)
          this.quantity1 = parseInt(ele.quantity)
          this.locationId1 = ele.id
        }
        else {
          this.regform.get("location").setValue(ele.location)
          this.quantity2 = parseInt(ele.quantity)
          this.locationId2 = ele.id
        }
        this.listOfStore.push(data);
      })
      //  console.log(this.listOfStore)
    }
    else {
      this.quantity1 = 0;
      this.quantity2 = 0;
      this.subLocationV = false;
    }
  }
  onTableDataChange(event) {
    this.page = event;
    if (this.sortN == 1) {
      this.getItemListFromSort()
    }
    else {
      this.getItemList();
    }
  }
  onTableSizeChange(event): void {
    this.tableSize = event.target.value;
    this.page = 1;
    if (this.sortN == 1) {
      this.getItemListFromSort()
    }
    else {
      this.getItemList();
    }
  }
  closeItems() {
    this.modelControler.dismiss();
  }
  filterSelected(event) {
    this.selectionChangedBySelectbox = true;
    let itemsList = event.value;
    let id = this.ListOfItemCategory.find(c => c.categoryName == itemsList).id;
    this.selectedRows = this.listofItems.filter(item => item.catagoryId == id).map(item => item.id);
    console.log(this.selectedRows)
    //this.listSelectedRows = this.listofItems.filter(item => item.CatagoryId === id);
    this.itemsList = itemsList;
  }
  selectionChangedHandler(event) {
    let currentIndex = event.currentSelectedRowKeys;
    currentIndex.forEach(element => {
      let addedItems = event.selectedRowsData.filter(c => c.id == element);
      this.oldListOfItems = Object.assign(this.data);
      addedItems.forEach(el => {
        let olditemid = this.oldListOfItems.find(c => c.id == el.id);
        if (olditemid) {
          //this.listOfItemsNew=[];
        }
        else {
          this.listSelectedRowsIndex.push(currentIndex);
          let list = {
            id: el.id,
            name: el.name,
            AmaricName: el.AmaricName,
            discrption: el.discrption,
            CatagoryId: el.CatagoryId,
            type: el.type,
            price: el.price,
            Quantity: el.Quantity,
            picture: el.picture,
            storeid: el.storeid,
            brand: el.brand,
            remark: el.remark
          }
          this.listOfItemsNew.push(list);
        }
      });
    });
  }
  selectedItems() {
    this.shardService.listOfItemAdd.next(this.listOfItemsNew);
    this.modelControler.dismiss();
  }
  fliter() {
    this.modelControler.create({
      component: FilterPage,
      cssClass: 'filterItems'
    }).then((modelElement) => {
      modelElement.present();
    })
  }
  sort() {
    this.modelControler.create({
      component: SortPage,
      cssClass: 'sortItem'
    }).then((modelElement) => {
      modelElement.present();
    })
  }
  historyOfItems(item) {
    this.modelControler.create({
      component: ItemHistoryPage,
      cssClass: 'my-custom-class',
      componentProps: {
        data: item
      }
    }).then((modelElement) => {
      modelElement.present();
    })

  }
  getFillData() {
    this.shardService.itemsId.subscribe(res => {
      let item = this.listofItems.find(c => c.id == res.id);
      console.log(item)
      this.regform.get('name').setValue(item.name);
      this.regform.get('AmaricName').setValue(item.amaricName);
      this.regform.get('type').setValue(item.type);
      this.regform.get('discrption').setValue(item.discrption);
      this.regform.get('CatagoryId').setValue(item.catagoryId);
      this.regform.get('price').setValue(item.price);
      this.regform.get('cost').setValue(item.cost);
      this.regform.get('Quantity').setValue(res.quantity);
      //this.regform.get('storeid').setValue(name);
      this.regform.get('brand').setValue(item.brand);
      this.regform.get('remark').setValue(item.remark);
      //this.regform.get('subLocation').patchValue(item.subLocation);
      this.base64textString = item.picture;
      this.listOfStore = []
      let itemLocationId = this.listOfItemLocation.find(c => c.itemId == res.id)
      if (itemLocationId !== undefined) {
        this.subLocationV = true;
        this.itemLocationId = itemLocationId.itemId;
        let dataOfItemL = this.listOfItemLocation.filter(c => c.itemId == this.itemLocationId)
        dataOfItemL.forEach(ele => {
          let data = {
            id: ele.id,
            location: ele.location,
            quantity: ele.quantity
          }
          if (res.store == this.location1) {
            this.regform.get("location1").setValue(ele.location)
            this.quantity1 = parseInt(res.quantity)
            this.locationId1 = ele.id
          }
          else {
            this.regform.get("location").setValue(ele.location)
            this.quantity2 = parseInt(res.quantity)
            this.locationId2 = ele.id
          }
          this.listOfStore.push(data);
        })
        //  console.log(this.listOfStore)
      }
      else {
        this.quantity1 = 0;
        this.quantity2 = 0;
        this.subLocationV = false;
      }
    })
  }
  scroll(ev) {
    const offset = ev.detail.scrollTop;
    this.showScroll = offset > 300;
  }
  doRefresh(ev) {
    setTimeout(() => {
      this.getItemList();
      ev.target.complete();
    }, 200);
  }
}
