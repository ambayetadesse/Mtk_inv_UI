import { IdSettingService } from "./../Service/id-setting.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { AlertController, IonContent, ModalController, Platform, PopoverController } from "@ionic/angular";
import { ItemStoreBalance, Customer, ItemCategory, Items, LineItem, Lookup, Vendors, Vocher, vocherStoreTransation, ItemLocation } from "src/Tabels/tabels-list";
import { BalanceService } from "../Service/balance.service";
import { ItemCategoryService } from "../Service/item-category.service";
import { ItemsService } from "../Service/items.service";
import { LineItemsService } from "../Service/line-items.service";
import { LookupService } from "../Service/lookup.service";
import { VocherService } from "../Service/vocher.service";
import { VoucherTransationService } from "../Service/voucher-transation.service";
import { SharedService } from "../Service/shared.service";
import { AppError } from "../common/app-error";
import { BadInput } from "../common/bad-input";
import { VendorsService } from "../Service/vendors.service";
import { CustomerService } from "../Service/customer.service";
import { PaymentDetailsPage } from "../payment-details/payment-details.page";
import { DxLookupComponent } from "devextreme-angular";
import { ItemsPage } from "../items/items.page";
import { CustomerPage } from "../customer/customer.page";
import { QtyDetailPage } from "./qty-detail/qty-detail.page";
import { ItemLocationService } from "../Service/item-location.service";
import { StockAdjustmentService } from "../Service/stock-adjustment.service";

@Component({
  selector: "app-vocher",
  templateUrl: "./vocher.page.html",
  styleUrls: ["./vocher.page.scss"],
})

export class VocherPage implements OnInit {
  @ViewChild("simpleLookup", { static: false }) simpleLookup: DxLookupComponent;
  @ViewChild("customer", { static: false }) customer: DxLookupComponent;
  popupVisible = true;
  regform = this.fb.group({});
  regformId = this.fb.group({});
  ListOfItemCategory: ItemCategory[];
  listoflookup: Lookup[];
  listofItems: any[];
  listofStore: Lookup[];
  FilterLookup: Lookup[];
  currentDate = new Date().toISOString();
  selectedDate = new Date().toISOString();
  minDate = new Date().toISOString();
  maxDate = new Date().toISOString();
  VocherNo: string = "0";
  Your_String: string;
  ListOfItems: any[] = [];
  SubTotal: number = 0;
  TaxAmount: number = 0;
  values: number;
  balance: {
    itemId: any;
    beginingQuantity: number;
    currentQuantity: number;
    storeId: number;
  };
  vocherTransation: {
    ItemID: number;
    vocherId: string;
    fromStoreId: number;
    toStoreId: number;
    amount: string;
  };
  FilterItems: Items[];
  Id: any;
  vocherId: string;
  formData: LineItem;
  itemList: Items[];
  Price: number;
  FilterItemCatagory: ItemCategory[];
  FilterItem: Items;
  Filter: Items;
  discrption: Items[];
  name: Items[];
  picture: Items[];
  selectedEmployee: any;
  filteredItemCategory: ItemCategory[];
  linename: Items[];
  Quantity: number;
  grandTotalVendor: number = 0;
  grandTotalCustomer: number = 0;
  VoucherName: string;
  FromStore: boolean = true;
  ToStore: boolean = true;
  vendors: boolean = true;
  customers: boolean = true;
  ToStoreValue: boolean;
  FromStoreValue: boolean;
  defaultSelectedCurrency: number;
  prefix: string;
  searchText: string;
  //paging declaration
  page = 1;
  count = 0;
  tableSize = 5;
  tableSizes = [3, 6, 9, 12];
  currentIndex = -1;
  VoucherId: string;
  vouchertype: Lookup[];
  LookUpId: string;
  LookUpName: string;
  id: Items[];
  SelectedDiv: boolean = true;
  index: number;
  item: string;
  Index: number;
  listOfVendor: Vendors[];
  listOfCustomer: Customer[];
  defaultSelectedVendor: number;
  defaultSelectedFromStored: number;
  defaultSelectedToStored: number;
  filterCustomer: Customer[];
  selectedCustomerBalance: number;
  customerBalance: boolean = false;
  vendorsBalance: boolean = false;
  vendor: boolean = false;
  grandTotalLabel: boolean = false;
  grandTotalVendorLabel: boolean = false;
  paid: number = 0;
  paidForm = this.fb.group({});
  grandTotalUpdate: number = 0;
  SubTotalGrandTotal: number = 0;
  TaxAmountGrandTotal: number = 0;
  GrandTotal: number = 0;
  reloadiv: boolean = true;
  updateBalance: number;
  previousTotal: number;
  settingGrandTotal: number = 0;
  x: number = 0;
  Balance: number = 0;
  filterVendor: Vendors[];
  vendorBalance: number;
  filterCustomerB: Customer[];
  filterVendorB: Vendors[];
  vendorBalanceList: number;
  customerBalanceList: number;
  isValid: boolean = true;
  receivedChildMessage: string;
  listOfVendorBalance: any;
  listOfVendorB: Vendors[];
  vendorB: number;
  fromStoreValue: Lookup[];
  toStoreValue: Lookup[];
  paymentStatus: string;
  y: number;
  itemName: string;
  commands: any[] = [];
  actionSheetVisible = false;
  actionSheetTarget: any = "";
  itemid: string;
  listOfLineItemC: any[] = [];
  listOfLineItemV: any[] = [];
  orderQty: number;
  reservedQty: number;
  LineItem: { vocherId: string; ItemID: string; Quantity: number; taxAmount: number; Price: number; cost: number; subTotal: number; };
  voucher: {
    vocherId: string; subTotal: number; taxAmount: number; grandTotal: number; date: string;
    //vocherTypeId: this.prefix, //(lookup)
    vocherTypeId: number; //(lookup)
    userId: number; vendorId: number; PaymentStatus: string;
  };
  cost: number;
  priceInput: boolean = false;
  costInput: boolean = false;
  Total: number;
  usePicker: boolean = false;
  vendorValue: number;
  customerValue: number;
  priceV: number;
  costV: number;
  SystemQty: number;
  listOfVoucher: any[] = [];
  PrefixVoucherType: string;
  selectedRows: number[];
  selectionChangedBySelectbox: boolean;
  listOfLineItem: LineItem[];
  listOfVoucherTransaction: vocherStoreTransation[];
  listOfVouchers: Vocher[];
  userIds: number;
  vendorIds: number;
  VendorColumn: boolean;
  CustomerColumn: boolean
  ToStoreId: number;
  fromStoreId: number;
  itemBalanceId: string;
  listOfBalance: ItemStoreBalance[];
  voucherTransactionId: any[];
  systemQtyDiff: number;
  updateSetting: number;
  listItemLocation: ItemLocation[];
  systemQtyDif: number;
  Setting: number;
  listOfVoucherType: any;
  listOfStockAdjustment: any[];
  vocherTypeId: string;
  transactionType: string;
  toStore: number;
  fromStore: number;
  storeId1: number;
  itemLocation: { itemId: any; location: number; quantity: number; };
  listOfV: any;
  showScroll: boolean = false
  @ViewChild('pageTop') pageTop: IonContent
  public pageScroller() {
    this.pageTop.scrollToTop()
  }
  constructor(
    private fb: FormBuilder,
    private lookupService: LookupService,
    private itemsService: ItemsService,
    private itemCategoryService: ItemCategoryService,
    private vocherService: VocherService,
    private balanceService: BalanceService,
    private voucherTranationService: VoucherTransationService,
    private lineItemService: LineItemsService,
    private sharedService: SharedService,
    private idSettingService: IdSettingService,
    private alertController: AlertController,
    private vendorService: VendorsService,
    private customerService: CustomerService,
    private modalController: ModalController,
    public popoverController: PopoverController,
    private itemLocationService: ItemLocationService,
    private stockAdjustmentService: StockAdjustmentService,
    private platform: Platform
  ) {
    //setting min date
    let date: Date = new Date();
    date.setDate(date.getDate() - 5);
    this.minDate = date.toISOString();
    //setting max date
    date = new Date();
    date.setDate(date.getDate() + 5);
    this.maxDate = date.toISOString();
  }
  voucherTypeID: number;
  ngOnInit() {
    this.paidForm = this.fb.group({ paid: 0, values: 0, totalAmount: [""] })
    this.regformId = this.fb.group({
      lineItemId: [], itemBalanceId: [],
      voucherTransactionId: []
    })
    this.regform = this.fb.group({
      date: ["", Validators.required],
      item: ["", Validators.required],
      Quantity: 1,
      Price: ["", Validators.required],
      cost: ["", Validators.required],
      fromStore: [0],
      toStore: [0],
      vendor: [0],
      customer: [0],
      updateBalance: 0,
      vendorBalance: 0,

    });
    this.getVoucherTpe();
    this.getSettingForm();
    this.getItemCategory();
    this.getLookUp();
    this.getItemList();
    this.getAllVendorList();
    this.getAllCustomerList();
    this.getStoreById();
    this.getAllLineItem();
    this.getQty();
    this.getListOfLineItem();
    this.getVoucherTranscation();
    this.getVoucher();
    this.getBalance();
    this.getItemLocation();
    this.getLineItem();

    this.getStockAdjustment();
    this.sharedService.itemsList.subscribe(async list => {
      this.itemName = await list.name;
      this.itemid = await list.id;
      this.SelectedDiv = false
      // console.log(this.itemName)
    })
    //this.reloadiv = true;
    this.sharedService.balance.subscribe(async res => {
      this.paid = await res.paymnetBalance;
      this.values = await res.updateBalance;
      // console.log(this.paid)
    })
    if ((this.platform.is('mobile') && !this.platform.is('hybrid')) ||
      this.platform.is('desktop')
    ) {
      this.usePicker = true;
    }
  }
  public fields: Object = { text: "name", value: "name" };
  public watermark2: string = "Select Item";
  public field: Object = { text: "name", value: "name" };
  public height: string = "250px";
  public watermark: string = "Select an Items";
 async getVoucherTpe() {
    this.sharedService.VoucherTypeId.subscribe(async (res) => {
      this.listOfVoucherType = await res;
    })
  }
  scroll(ev) {
    const offset = ev.detail.scrollTop
    this.showScroll = offset > 300;
  }
 async getSettingForm() {
    this.sharedService.VoucherTypeId.subscribe(async (res) => {
      this.voucherTypeID = await res.id;
      this.VoucherName = await res.name;
      this.VoucherId = await res.id;
      this.VocherNo = "";
      this.currentDate = new Date().toISOString();
      this.idSettingService.getAllIdSetting().subscribe(async listOfObj => {
        let Result = await listOfObj.filter(c => c.voucherTypeId == this.voucherTypeID);
        //let id = +Result[0].currentId + 1;//vocherTypeId
        let id = 0;
        this.PrefixVoucherType = "null";
        this.vocherService.getAllVocher().subscribe(async (res) => {
          let result = await res.filter(c => c.vocherTypeId == this.voucherTypeID);
          this.getLineItem();
          if (result.length == 0) id = 1;
          else id = result.length + 1;
          this.VocherNo = "0";
          let padStart = this.VocherNo.padStart(Result[0].length, "0");
          let suffix = Result[0].suffix;
          let prefix = Result[0].prefix;
          this.PrefixVoucherType = prefix;
          this.VocherNo = prefix + "-" + padStart + id + "-" + suffix;
          // console.log(this.VocherNo);
          this.prefix = Result[0].prefix;
          this.fillData();
          if (this.VoucherName == "Sale order") {
            this.ToStore = false;
            this.FromStore = true;
            this.ToStoreValue = false;
            this.regform.get("toStore").reset();
            this.FromStoreValue = true;
            this.customers = true;
            this.vendors = false;
            this.priceInput = true;
            this.costInput = false;
            this.regform.get("updateBalance").reset();
            this.regform.get("vendorBalance").reset();
            this.paidForm.get("values").reset();
            this.paidForm.get("totalAmount").reset();
            this.vendorsBalance = false;
            this.ListOfItems = [];
          } else if (this.VoucherName == "Cash Sales") {
            this.ToStore = false;
            this.FromStore = true;
            this.ToStoreValue = false;
            this.regform.get("toStore").reset();
            this.FromStoreValue = true;
            this.customers = true;
            this.vendors = false;
            this.priceInput = true;
            this.costInput = false;
            this.regform.get("updateBalance").reset();
            this.regform.get("vendorBalance").reset();
            this.paidForm.get("values").reset();
            this.paidForm.get("totalAmount").reset();
            this.vendorsBalance = false;
            this.ListOfItems = [];

          } else if (this.VoucherName == "Purchase order") {
            this.FromStore = false;
            this.ToStore = true;
            this.ToStoreValue = true;
            this.FromStoreValue = false;
            this.regform.get("fromStore").reset();
            this.customers = false;
            this.vendors = true;
            this.vendor = true;
            this.priceInput = false;
            this.costInput = true;
            this.regform.get("updateBalance").reset();
            this.regform.get("vendorBalance").reset();
            this.paidForm.get("values").reset();
            this.paidForm.get("totalAmount").reset();
            this.customerBalance = false;
            this.ListOfItems = [];
          } else if (this.VoucherName == "Good Recieve") {
            this.FromStore = false;
            this.vendors = true;
            this.ToStoreValue = true;
            this.FromStoreValue = false;
            this.regform.get("fromStore").reset();
            this.ToStore = true;
            this.customers = false;
            this.vendors = true;
            this.vendor = true;
            this.priceInput = false;
            this.costInput = true;
            this.customerBalance = false;
            this.regform.get("updateBalance").reset();
            this.regform.get("vendorBalance").reset();
            this.paidForm.get("values").reset();
            this.paidForm.get("totalAmount").reset();
            this.ListOfItems = [];
          }
        });
      });
    });
  }
  filter(query) {
    this.filteredItemCategory = query.target.value ? this.ListOfItemCategory.filter((p) =>
      p.categoryName
        .toLowerCase()
        .includes(query.target.value.toLowerCase())
    )
      : this.ListOfItemCategory;
  }
  getDisplayExpr(item) {
    if (!item) {
      return "";
    }
    return item.name + " " + item.discrption;
  }
  getDisplayCustomer(item) {
    if (!item) {
      return "";
    }
    return item.fullname + " " + item.phonenumber;
  }
  getDisplayVendor(item) {
    if (!item) {
      return "";
    }
    return item.vendorName + " " + item.phonenumber;
  }
  getDisplayStore(item) {
    if (!item) {
      return "";
    }
    return item.name;
  }
  SelectedVendorValue(event) {
    this.vendorsBalance = true;
    this.customerBalance = false;
    const newValue = event.value;
    const previousValue = event.previousValue;
    this.id = newValue || previousValue;
    this.filterVendor = this.listOfVendor.filter(c => c.id == event.value);
    if (this.id == newValue) {
      this.vendorBalance = parseFloat(this.filterVendor[0].balance);
      this.defaultSelectedVendor = this.filterVendor[0].id
    }
    else {
      this.regform.get("vendor").reset();
    }
  }
  SelectedCustomerValue(event) {
    this.customerBalance = true;
    this.vendorsBalance = false;
    this.vendor = false;
    const newValue = event.value;
    const previousValue = event.previousValue;
    this.id = newValue || previousValue;
    this.filterCustomer = this.listOfCustomer.filter(c => c.id == event.value);
    if (this.id == newValue) {
      this.selectedCustomerBalance = this.filterCustomer[0].balance;
      this.defaultSelectedCurrency = this.filterCustomer[0].id;
      this.updateBalance = this.selectedCustomerBalance;
    }
    else {
      this.regform.get("customer").reset();
    }
  }
  valueChanged($event) {
    const previousValue = $event.previousValue;
    const newValue = $event.value;
    this.itemid = $event.value;
    this.id = newValue || previousValue;
    this.itemName = this.itemName;
    this.linename = this.listofItems.filter((c) => c.id == ($event.value || $event.previousValue));
    let Q = 1
    this.Quantity = Q;
    let p = this.linename[0].price;
    this.Price = p;
    let c = this.linename[0].cost;
    this.cost = c;
    if (this.id == newValue) {
      this.linename[0].picture = this.linename[0].picture;
      this.linename[0].discrption = this.linename[0].discrption;
      this.linename[0].name = this.linename[0].name;
      this.SelectedDiv = true;
    } else {
      this.linename[0] = null;
      this.SelectedDiv = false;
    }
  }
  SelectedFromStoreValue($event) {
    this.fromStoreValue = this.listofStore.filter(c => c.id == $event.value);
    this.defaultSelectedFromStored = this.listofStore[0].id;
  }
  SelectedToStoreValue($event) {
    this.toStoreValue = this.listofStore.filter(c => c.id == $event.value);
    this.defaultSelectedToStored = this.listofStore[0].id;
  }
  getItemCategory() {
    this.itemCategoryService.getAllItemCategories().subscribe(async (result) => {
      this.ListOfItemCategory = await result;
      let store = result.find(c => c.categoryName == this.regform.get("catagory")
      );
      if (store) {
        this.getLookupById(store.id);
      }
    });
    // }
  }
  getLookupById(id: number) {
    this.lookupService.getAllLookUp().subscribe(async(result) => {
      this.listoflookup = await result.filter(c => c.type == id);
     // console.log(this.listoflookup)
    });
  }
  getStoreById() {
    this.lookupService.getAllLookUp().subscribe(async (result) => {
      console.log(result)
      if (await result.length > 0) {
        this.listofStore = await result.filter(c => c.type == 3);
        this.defaultSelectedFromStored = this.listofStore[0].id;
        this.defaultSelectedToStored = this.listofStore[0].id;
      }
      else {
        this.AlertInternet();
      }
    });
  }
  getAllVendorList() {
    this.vendorService.getAllVendor().subscribe(async res => {
      this.listOfVendor = await res;
      this.defaultSelectedVendor = this.listOfVendor[0].id;
    });
  }
  getAllCustomerList() {
    this.customerService.getAllCustomer().subscribe(async res => {
      this.listOfCustomer = await res;
      this.defaultSelectedCurrency = this.listOfCustomer[0].id;
    })
  }
  getLookUp() {
    try {
      this.lookupService.getAllLookUp().subscribe(async(result) => {
        if (result.length > 0) {
          this.listoflookup = await result;
        } else {
          // this.AlertInternet();
        }
      });
    } catch (error) {
      //    console.log(error);
    }
  }
  getItemList() {
    this.itemsService.getAllItem().subscribe(async (result) => {
      this.listofItems = await result;
    });
  }
  getAllLineItem() {
    this.lineItemService.getAllLineItem().subscribe(async lineItemList => {
      await lineItemList.forEach(ele => {
        let voucherTypeId = ele.vocherId
        let vocherTypeId = voucherTypeId.substring(0, 2);
        if (vocherTypeId == "GR" || "PO") {
          let data = {
            ItemID: ele.itemId,
            Quantity: ele.quantity
          }
          this.listOfLineItemV.push(data);
        }
        else if (vocherTypeId == "SO" || "CS") {
          let data1 = {
            ItemID: ele.itemId,
            Quantity: ele.quantity
          }
          this.listOfLineItemC.push(data1);
        }
      });
    })
  }
  getListOfLineItem() {
    this.lineItemService.getAllLineItem().subscribe(async res => {
      this.listOfLineItem = await res;
    })
  }
  getVoucherTranscation() {
    this.voucherTranationService.getAllVocher().subscribe(async res => {
      this.listOfVoucherTransaction = await res;
    })
  }
  getVoucher() {
    this.vocherService.getAllVocher().subscribe(async res => {
      this.listOfVouchers = await res;
    })
  }
  getBalance() {
    this.balanceService.getAllBalance().subscribe(async res => {
      this.listOfBalance = await res;
    })
  }
  getItemLocation() {
    this.itemLocationService.getAllItemLocation().subscribe(async res => {
      this.listItemLocation = await res;
    })
  }
  getStockAdjustment() {
    this.stockAdjustmentService.getAllStockAdjustment().subscribe(async res => {
      this.listOfStockAdjustment = await res;
    })
  }
  Save() {
    this.Setting = 0;
    this.SubTotal = 0;
    this.grandTotalCustomer = 0
    this.grandTotalVendor = 0
    let item = this.regform.get("item").value;
    let Quantity = this.regform.get("Quantity").value;
    let price = this.regform.get("Price").value
    let cost = this.regform.get("cost").value
    if ((item != null || item != undefined ) && (Quantity != null || Quantity != undefined) && ((price != null || price != "") || (cost != null || cost != undefined))) {
      if (cost !== "" && cost != 0) {
        this.priceV = 0;
        this.costV = this.regform.get("cost").value;
        this.Total = this.costV * this.regform.get("Quantity").value
      }
      else {
        this.costV = 0;
        this.priceV = this.regform.get("Price").value;
        this.Total = this.priceV * this.regform.get("Quantity").value
      }
      let value = {
        voucherId: this.VocherNo,
        date: this.regform.get("date").value,
        ItemName: this.listofItems.find((c) => c.id == this.regform.get("item").value).name,
        Quantity: this.regform.get("Quantity").value,
        Price: this.priceV,
        cost: this.costV,
        Total: this.Total,
        item: this.regform.get("item").value,
        toStore: this.regform.get("toStore").value,
        fromStore: this.regform.get("fromStore").value,
        vendor: this.regform.get("vendor").value,
        customer: this.regform.get("customer").value,
        lineItemId: this.regformId.get("lineItemId").value,
        voucherTransactionId: this.regformId.get("voucherTransactionId").value,
        itemBalanceId: this.regformId.get("itemBalanceId").value
      };
      if (!(this.index || this.index == 0)) {
        this.SubTotal += this.Total;
        this.ListOfItems.push(value);
        this.updateBalanceGrandTotal();
      } else {
        this.index = this.ListOfItems.findIndex((x) => x.item === value.item);
        this.removeRowIndex(this.index);
        this.index = null;
        this.ListOfItems.push(value);
        this.updateBalanceGrandTotal();
      }
      this.regform.get("item").reset();
      this.cost = 0;
      this.Price = 0;
      this.regform.get("Quantity").reset();
    } else {
      this.ErrorAlert();
    }
  }
  async ErrorAlert() {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "Error",
      message: "Please Enter All field.",
      buttons: ["OK"],
    });
    await alert.present();
  }
  UpdateRow(item) {
    this.index = this.ListOfItems.findIndex((x) => x.item === item.item);
    // this.regform.get("date").setValue(item.date);
    this.regform.get("item").setValue(item.item);
    this.regform.get("Quantity").setValue(item.Quantity);
    this.regform.get("Price").setValue(item.Price);
    this.regform.get("cost").setValue(item.cost);
    this.regform.get("fromStore").setValue(item.fromStore);
    this.regform.get("toStore").setValue(item.toStore);
    this.regform.get("customer").setValue(item.customer);
    this.regform.get("vendor").setValue(item.vendor);
    this.regformId.get("lineItemId").setValue(item.lineItemId);
    this.regformId.get("itemBalanceId").setValue(item.itemBalanceId);
    this.regformId.get("voucherTransactionId").setValue(item.voucherTransactionId);
  }
  onKey() {
    if (this.vendor == true)
      this.selectedCustomerBalance = this.vendorBalanceList;
    else
      this.selectedCustomerBalance = this.customerBalanceList;
    this.values = parseFloat((this.selectedCustomerBalance - this.paid).toFixed(2));
  }
  updateBalanceGrandTotal() {
    let customerB = this.selectedCustomerBalance;
    let vendorB = this.vendorBalance
    //vendor balance
    if (this.vendor == true) {
      this.vendorBalanceList = this.ListOfItems.reduce((prev, curr) => {
        return prev + curr.Total;
      }, 0);
      this.vendorBalanceList = parseFloat(this.vendorBalanceList.toFixed(2));
      this.grandTotalVendor = this.vendorBalanceList;
      this.vendorBalanceList = vendorB + parseFloat(this.grandTotalVendor.toFixed(2));
      this.values = parseFloat(this.vendorBalanceList.toFixed(2));
    }
    //customer balance 
    else {
      this.customerBalanceList = this.ListOfItems.reduce((prev, curr) => {
        return prev + curr.Total;
      }, 0);
      this.customerBalanceList = parseFloat(this.customerBalanceList.toFixed(2));
      this.grandTotalCustomer = this.customerBalanceList;
      this.customerBalanceList = +customerB + this.grandTotalCustomer;
      this.values = this.customerBalanceList;
    }
  }
  updateItemQty(itemId: number, currentQty: number, type: number) {
    this.systemQtyDiff = 0
    let item = this.listofItems.find(c => c.id == itemId)
    let itemPrev = this.listOfLineItem.find(c => c.ItemID == itemId)
    if (type == 0) {
      if (this.Setting == 0 && itemPrev !== undefined) {
        this.SystemQty = item.quantity - currentQty;
      }
      else if (this.Setting == 0 && itemPrev == undefined) {
        this.SystemQty = item.quantity - currentQty;
      }
      else if (itemPrev !== undefined && this.updateSetting == 1) {
        if (itemPrev.Quantity > currentQty) {
          this.systemQtyDiff = itemPrev.Quantity - currentQty;
        }
        else {
          this.systemQtyDiff = currentQty - itemPrev.Quantity;
        }
        this.SystemQty = item.quantity - this.systemQtyDiff;
      }
    }
    else {
      if (this.Setting == 0 && itemPrev !== undefined) {
        this.SystemQty = item.quantity + currentQty;
      }
      else if (this.Setting == 0 && itemPrev == undefined) {
        this.SystemQty = item.quantity + currentQty;
      }
      else if (itemPrev !== undefined && this.updateSetting == 1) {
        if (itemPrev.Quantity > currentQty) {
          this.systemQtyDiff = itemPrev.Quantity - currentQty;
        }
        else {
          this.systemQtyDiff = currentQty - itemPrev.Quantity;
        }
        this.SystemQty = item.quantity + this.systemQtyDiff;
      }
    }
    let itemData = {
      id: itemId,
      name: item.name,
      AmaricName: item.amaricName,
      discrption: item.discrption,
      CatagoryId: item.catagoryId,
      type: item.type,
      cost: item.cost,
      price: item.price,
      Quantity: this.SystemQty,
      storeid: item.storeid,
      brand: item.brand,
      picture: item.picture,
      remark: item.remark,
    }
    this.itemsService.updateItem(itemData).subscribe(res => {
      console.log(res.toString());
    })
  }
  Send() {
    let lengthOfListOfItems = this.ListOfItems.length;
    let storeValidition = this.regform.get("fromStore").value || this.regform.get("toStore").value;
    let validation = this.regform.get('vendor').value || this.regform.get('customer').value
    if (!(lengthOfListOfItems == 0) && (storeValidition != null && storeValidition != "") &&(validation != null && validation !="") ) {
      this.ListOfItems.forEach((element) => {
        //To check vendor or customer
        let vendor = this.regform.get("vendor").value
        let customer = this.regform.get("customer").value
        if (vendor == 0) {
          this.vendorValue = 0;
        }
        else {
          this.vendorValue = vendor;
        }
        if (customer == 0) {
          this.customerValue = 0;
        }
        else {
          this.customerValue = customer;
        }
        //To check ToStore and From store
        if (element.toStore == null) {
          this.toStore = 0;
        } else {
          this.toStore = element.toStore;
        }
        if (element.fromStore == null) {
          this.fromStore = 0;
        }
        else {
          this.fromStore = element.fromStore;
        }
        //To check vendor or customer with quantity update in items tables
        if (this.vendorValue != 0) {
          let increase = 1;
          this.updateItemQty(element.item, element.Quantity, increase)
        }
        else if (this.customerValue != 0) {
          let decrease = 0;
          this.updateItemQty(element.item, element.Quantity, decrease);
        }
        //to insert data in line item table
        this.LineItem = {
          vocherId: this.VocherNo,
          ItemID: element.item,
          Quantity: element.Quantity,
          taxAmount: 0,
          Price: element.Price,
          cost: element.cost,
          subTotal: element.Total,
        };
        let voucher = this.listOfLineItem.find(c => c.vocherId == +this.VocherNo)
        if (voucher == undefined) {
          if (this.VocherNo || this.regform.valid) {
            this.lineItemService.create(this.LineItem).subscribe(res => {
              // console.log(res.toString())
            })
          }
        }
        else {
          this.SubTotal += element.Total;
          let dataOfLineItem = {
            id: element.lineItemId,
            vocherId: this.VocherNo,
            ItemID: element.item,
            Quantity: element.Quantity,
            taxAmount: 0,
            Price: element.Price,
            cost: element.cost,
            subTotal: element.Total
          }
          this.lineItemService.updateLineItem(dataOfLineItem).subscribe(res => {
            // console.log(res.toString());
          });
        }
        let voucherTypeId = this.VocherNo
        this.vocherTypeId = voucherTypeId.substring(0, 2);
        if (this.vocherTypeId == "GR") {
          this.transactionType = "Good receive"
        }
        else if (this.vocherTypeId == "CS") {
          this.transactionType = "Case sales"
        }
        else if (this.vocherTypeId == "PO") {
          this.transactionType = "purchase order"
        }
        else if (this.vocherTypeId == "SO") {
          this.transactionType = "Sales order"
        }
        //to insert data in balance table
        let curent = 0;
        let result = this.listofItems.find(c => c.id == element.item);
        let storeId = element.toStore || element.fromStore
        let itemLocationId = this.listItemLocation.find(c => c.itemId == element.item && c.location == storeId)
        let itemStoreBalance = this.listOfBalance.find(c => c.itemId == element.item && c.storeId == storeId)
        let itemPrev = this.listOfLineItem.find(c => c.ItemID == element.item);
        if (this.vendorValue == 0) {
          if (itemStoreBalance !== undefined) {
            this.storeId1 = itemStoreBalance.storeId
          }
          else {
            this.storeId1 = storeId
          }
          if (result) {
            if (this.Setting == 0 && itemPrev !== undefined) {
              if (itemStoreBalance !== undefined) {
                curent = itemStoreBalance.currentQuantity - element.Quantity;
              }
              else {
                curent = -element.Quantity;
              }
            }
            else if (this.Setting == 0 && itemPrev == undefined) {
              if (itemStoreBalance !== undefined) {
                if (itemStoreBalance !== undefined) {
                  curent = itemStoreBalance.currentQuantity - element.Quantity;
                }
                else {
                  curent = -element.Quantity;
                }
              }
              else {
                curent = -element.Quantity;
              }
            }
            else if (itemPrev !== undefined && this.updateSetting == 1) {
              if (itemPrev.Quantity > element.Quantity) {
                this.systemQtyDif = itemPrev.Quantity - element.Quantity;
              }
              else {
                this.systemQtyDif = element.Quantity - itemPrev.Quantity;
              }
              if (itemStoreBalance !== undefined) {
                curent = itemStoreBalance.currentQuantity - this.systemQtyDif;
              }
              else {
                curent = -element.Quantity;
              }
            }
          }
          //Add stock Adjustment
          let stockAdjust = this.listOfStockAdjustment.find(c => c.itemId == element.item && c.store == this.storeId1)
          if (stockAdjust !== undefined) {
            let stock = {
              transactionType: this.transactionType,
              transactionNumber: this.VocherNo,
              itemId: element.item,
              store: this.storeId1,
              QuantityBefore: stockAdjust.quantityAfter,
              QuantityAfter: stockAdjust.quantityAfter - element.Quantity,
              Quantity: -element.Quantity,
              date: this.currentDate
            }
            this.stockAdjustmentService.create(stock).subscribe(res => {
              // console.log(res.toString())
            })
          } else {
            let stock = {
              transactionType: this.transactionType,
              transactionNumber: this.VocherNo,
              itemId: element.item,
              store: this.storeId1,
              QuantityBefore: 0,
              QuantityAfter: -element.Quantity,
              Quantity: -element.Quantity,
              date: this.currentDate
            }
            this.stockAdjustmentService.create(stock).subscribe(res => {
              // console.log(res.toString())
            })
          }

        }
        else {
          if (itemStoreBalance !== undefined) {
            this.storeId1 = itemStoreBalance.storeId
          }
          else {
            this.storeId1 = storeId
          }
          if (result) {
            if (this.Setting == 0 && itemPrev !== undefined) {
              if (itemStoreBalance !== undefined) {
                curent = itemStoreBalance.currentQuantity + element.Quantity;
              }
              else {
                curent = -element.Quantity;
              }
            }
            else if (this.Setting == 0 && itemPrev == undefined) {
              if (itemStoreBalance !== undefined) {
                curent = itemStoreBalance.currentQuantity + element.Quantity;
              }
              else {
                curent = -element.Quantity;
              }
            }
            else if (itemPrev !== undefined && this.updateSetting == 1) {
              if (itemPrev.Quantity > element.Quantity) {
                this.systemQtyDif = itemPrev.Quantity - element.Quantity;
              }
              else {
                this.systemQtyDif = element.Quantity - itemPrev.Quantity;
              }
              if (itemStoreBalance !== undefined) {
                curent = itemStoreBalance.currentQuantity + this.systemQtyDif;
              }
              else {
                curent = -element.Quantity;
              }
            }
          }
          //Add stock Adjustment
          let stockAdjust = this.listOfStockAdjustment.find(c => c.itemId == element.item && c.store == this.storeId1)
          if (stockAdjust !== undefined) {
            let stock = {
              transactionType: this.transactionType,
              transactionNumber: this.VocherNo,
              itemId: element.item,
              store: this.storeId1,
              QuantityBefore: stockAdjust.quantityAfter,
              QuantityAfter: stockAdjust.quantityAfter + element.Quantity,
              Quantity: element.Quantity,
              date: this.currentDate
            }
            this.stockAdjustmentService.create(stock).subscribe(res => {
              // console.log(res.toString())
            })
          } else {
            let stock = {
              transactionType: this.transactionType,
              transactionNumber: this.VocherNo,
              itemId: element.item,
              store: this.storeId1,
              QuantityBefore: 0,
              QuantityAfter: + element.Quantity,
              Quantity: element.Quantity,
              date: this.currentDate
            }
            this.stockAdjustmentService.create(stock).subscribe(res => {
              // console.log(res.toString())
            })
          }

        }
        if (itemStoreBalance !== undefined) {
          this.balance = {
            itemId: element.item,
            beginingQuantity: itemStoreBalance.beginingQuantity,
            currentQuantity: curent,
            storeId: this.storeId1,
          };
        }
        else {
          this.balance = {
            itemId: element.item,
            beginingQuantity: 0,
            currentQuantity: curent,
            storeId: this.storeId1,
          };
        }
        if (itemLocationId !== undefined) {
          this.itemLocation = {
            itemId: element.item,
            location: this.storeId1,
            quantity: curent
          };
        }
        else {
          this.itemLocation = {
            itemId: element.item,
            location: this.storeId1,
            quantity: curent
          };
        }
        //update item location data
        if (itemLocationId == undefined) {
          this.itemLocationService.create(this.itemLocation).subscribe(res => {
            // console.log(res.toString());
          })
        } else {
          let dataOfItemLoction = {
            id: itemLocationId.id,
            itemId: element.item,
            location: this.storeId1,
            quantity: curent
          }
          this.itemLocationService.updateItemLoaction(dataOfItemLoction).subscribe(res => {
            // console.log(res.toString());
          });
        }
        if (this.VocherNo || this.regform.valid) {
          if (itemStoreBalance == undefined) {
            this.balanceService.create(this.balance).subscribe(res => {
              // console.log(res.toString());
            });
          }
          else {
            let dataOfBalance = {
              id: itemStoreBalance.id,
              itemId: element.item,
              beginingQuantity: 0,
              currentQuantity: curent,
              storeId: this.storeId1,
            }
            this.balanceService.updateBalance(dataOfBalance).subscribe(res => {
              // console.log(res.toString());
            });
          }
        } else {
          this.ErrorAlert();
        }
        //to insert data in vouchertransaction table
        this.vocherTransation = {
          ItemID: element.item,
          vocherId: this.VocherNo,
          fromStoreId: this.fromStore,
          toStoreId: this.toStore,
          amount: element.Quantity,
        };
        let vouchers = this.listOfVoucherTransaction.find(c => c.vocherId == this.VocherNo);
        if (vouchers == undefined) {
          if (this.VocherNo || this.regform.valid)
            this.voucherTranationService.create(this.vocherTransation).subscribe(res => {
              // console.log(res.toString())
            });
        }
        else {
          let data = {
            id: element.voucherTransactionId,
            ItemID: element.item,
            vocherId: this.VocherNo,
            fromStoreId: this.fromStore,
            toStoreId: this.toStore,
            amount: element.Quantity,
          }
          this.voucherTranationService.updateVocherTransation(data).subscribe(res => {
            // console.log(res.toString());
          });
        }
      });
      //to insert data in voucher table 
      if (this.paid == null || this.paid == 0) {
        this.paymentStatus = "Unpaid"
      }
      else {
        this.paymentStatus = "paid"
      }
      let subTotal = this.grandTotalCustomer || this.grandTotalVendor
      this.voucher = {
        vocherId: this.VocherNo,
        subTotal: subTotal,
        taxAmount: 0,
        grandTotal: subTotal + this.TaxAmount,
        date: this.currentDate,
        vocherTypeId: this.voucherTypeID, //(lookup)
        userId: this.customerValue,
        vendorId: this.vendorValue,
        PaymentStatus: this.paymentStatus,
      };
      let voucher = this.listOfVouchers.find(c => c.vocherId == this.VocherNo)
      if (voucher == undefined) {
        if (this.VocherNo || this.regform.valid) {
          this.vocherService.create(this.voucher).subscribe(res => {
            // console.log(res.toString());
          });
        }
      }
      else {
        let vId = this.listOfVouchers.find(c => c.vocherId == this.VocherNo).id
        let data = {
          id: vId,
          vocherId: this.VocherNo,
          subTotal: subTotal,
          taxAmount: 0,
          grandTotal: subTotal + this.TaxAmount,
          date: this.currentDate,
          vocherTypeId: this.voucherTypeID, //(lookup)
          userId: this.customerValue,
          vendor: this.vendorValue,
          PaymentStatus: this.paymentStatus,
        }
        this.vocherService.updateVocher(data).subscribe(res => {
          // console.log(res.toString());
        });
      }
      this.getUpdateBalance();
      this.ListOfItems = [];
      this.paidForm.reset();
      this.paidForm.get("totalAmount").reset();
      this.regform.get("vendor").reset();
      this.regform.get("customer").reset();
      this.customerBalance = false;
      this.vendorsBalance = false;
      this.presentAlert("Add " + this.VoucherName + " Sucessfuly");
    }
    else {
      this.ErrorAlert();
    }
  }
  getUpdateBalance() {
    if (this.vendor == true) {
      let updateVendorData = {
        id: this.defaultSelectedVendor,
        address: this.filterVendor[0].address,
        phonenumber: this.filterVendor[0].phonenumber,
        contact: this.filterVendor[0].contact,
        balance: (this.vendorBalance + this.grandTotalVendor - this.paid).toString(),
        vendorName: this.filterVendor[0].vendorName,
        email: this.filterVendor[0].email,
        website: this.filterVendor[0].website
      }
      this.vendorService.updateVendor(updateVendorData).subscribe(
        () =>
          (error: AppError) => {
            if (error instanceof BadInput) {
              this.regform.setErrors(error.originalError);
            }
            else throw error;
          }
      );
    }
    else {
      let updateCustomerData = {
        id: this.defaultSelectedCurrency,
        fullname: this.filterCustomer[0].fullname,
        phonenumber: this.filterCustomer[0].phonenumber,
        location: this.filterCustomer[0].location,
        balance: this.selectedCustomerBalance + this.grandTotalCustomer - this.paid,
        address: this.filterCustomer[0].address
      }
      this.customerService.updateCustomer(updateCustomerData).subscribe(
        () =>
          (error: AppError) => {
            if (error instanceof BadInput) {
              this.regform.setErrors(error.originalError);
            }
            else throw error;
          }
      );
    }
  }
  removeRowIndex(index) {
    this.ListOfItems.splice(index, 1);
  }
  removeRow(index) {
    this.presentAlertConfirm(index);
  }
  async presentAlertConfirm(index) {
    const alert = await this.alertController.create({
      header: "Confirm!",
      message: "<strong>Are you sure you want delete?</strong>",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: (blah) => {
            console.log("Confirm Cancel: blah");
          },
        },
        {
          text: "OK",
          handler: () => {
            this.ListOfItems.splice(index, 1);
            this.updateBalanceGrandTotal();
          },
        },
      ],
    });
    await alert.present();
  }
  async presentAlert(message) {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: this.VoucherName,
      message: message,
      buttons: ["ok"],
    });
    await alert.present();
  }
  //paging function
  onTableDataChange(event) {
    this.page = event;
    this.ListOfItems;
  }
  async Payment() {
    const modal = await this.modalController.create({
      component: PaymentDetailsPage,
      cssClass: 'my-custom',
      componentProps: {
        customerId: this.defaultSelectedCurrency,
        vendorId: this.defaultSelectedVendor,
        balance: this.values,
        grandTotalCustomer: this.grandTotalCustomer,
        grandTotalVendor: this.grandTotalVendor,
        date: this.regform.get("date").value
      }
    });
    return await modal.present().then(_ => {
      // triggered when opening the modal
      // console.log('Sending: ',this.values);
      // console.log('Sending: ',this.defaultSelectedCurrency);
    });
  }
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
  async crateCustomer() {
    const modal = await this.modalController.create({
      component: CustomerPage,
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
  addCustomer = (e) => {
    this.crateCustomer();
    this.customer.instance.close();
  };
  addItem = (e) => {
    this.crateItem();
    this.simpleLookup.instance.close();
  };
  Cancel = () => {
    this.simpleLookup.instance.close();
  };
  CancelCustomer = () => {
    this.customer.instance.close();
  }
  qtyHistory(eve) {
    console.log("hi");
  }
  showNotify(value) {
    //notify('The "' + value + '" button is clicked.');
  }
  getQty() {
    this.orderQty = 0;
    this.reservedQty = 0;
    let id = this.itemid;
    //console.log(id);
    if (id)
      this.itemsService.getAllItem().subscribe(res => {
        let Qty = res.find(c => c.id == id);
        this.commands = [];
        console.log(this.listOfLineItemV)
        let QtyOrder = this.listOfLineItemV.filter(c => c.ItemID == id);
        QtyOrder.forEach(element => {
          this.orderQty = this.orderQty + element.Quantity;
        });
        console.log(this.listOfLineItemC)
        let QtyReserved = this.listOfLineItemC.filter(c => c.ItemID == id);
        QtyReserved.forEach(element => {
          this.reservedQty = this.reservedQty + element.Quantity;
        });
        let data = {
          Qty_Reserved: this.reservedQty,
          Qty_On_Order: this.orderQty,
          Qty_Available: Qty.quantity - this.orderQty
        }
        this.commands.push(data);
        //   console.log(this.commands);
      })
  }
  async itemClick(ev: any) {
    this.getQty();
    const popover = await this.popoverController.create({
      component: QtyDetailPage,
      cssClass: 'my-custom-class',
      event: ev,
      componentProps: {
        data: this.commands
      },
      translucent: true
    });
    return await popover.present();
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
  getLineItem() {
    this.listOfVoucher = [];
    this.vocherService.getAllVocher().subscribe(async res => {
      //Sale Order of data
      if (this.voucherTypeID == 3) {
        this.VendorColumn = false;
        this.CustomerColumn = true;
        let saleO = await res.filter(c => c.vocherTypeId == 3);
        saleO.forEach(ele => {
          let data = {
            Order: ele.vocherId,
            Order_Date: ele.date,
            Customer: this.listOfCustomer.find(c => c.id == ele.userId).fullname
          }
          this.listOfVoucher.push(data)
        })
      }
      //Case Sale of data 
      else if (this.voucherTypeID == 4) {
        this.VendorColumn = false;
        this.CustomerColumn = true;
        let caseS = res.filter(c => c.vocherTypeId == 4);
        caseS.forEach(ele => {
          let data = {
            Order: ele.vocherId,
            Order_Date: ele.date,
            Customer: this.listOfCustomer.find(c => c.id == ele.userId).fullname
          }
          this.listOfVoucher.push(data)
        })
      }
      //Good recieve of data
      else if (this.voucherTypeID == 1) {
        this.VendorColumn = true;
        this.CustomerColumn = false;
        let GoodR = res.filter(c => c.vocherTypeId == 1);
        GoodR.forEach(ele => {
          let data = {
            Order: ele.vocherId,
            Order_Date: ele.date,
            Vendor: this.listOfVendor.find(c => c.id == ele.vendorId).vendorName
          }
          this.listOfVoucher.push(data)
        })
      }
      //Puchase order of data
      else {
        this.VendorColumn = true;
        this.CustomerColumn = false;
        let purchaseO = res.filter(c => c.vocherTypeId == 5);
        purchaseO.forEach(ele => {
          let data = {
            Order: ele.vocherId,
            Order_Date: ele.date,
            Vendor: this.listOfVendor.find(c => c.id == ele.vendorId).vendorName
          }
          this.listOfVoucher.push(data)
        })
      }
    })
  }
  selectionChangedRow(ev) {
    this.updateSetting = 1;
    this.ListOfItems = [];
    let data = ev.selectedRowKeys;
    data.forEach(element => {
      let order = element.Order
      let lineItemList = this.listOfLineItem.filter(c => c.vocherId == order)
      // console.log(lineItemList)
      lineItemList.forEach(ele => {
        let Userid = this.listOfVouchers.find(c => c.vocherId == ele.vocherId.toString()).userId
        let vendorId = this.listOfVouchers.find(c => c.vocherId == ele.vocherId.toString()).vendorId
        let items = this.listofItems.find(c => c.id == ele.ItemID)
        this.regform.get("date").setValue(element.Order_Date);
        this.VocherNo = element.Order
        if (Userid != 0) {
          this.regform.get("customer").setValue(this.listOfCustomer.find(c => c.id == Userid).id);
        }
        else if (vendorId != 0) {
          this.regform.get("vendor").setValue(this.listOfVendor.find(c => c.id == +vendorId).id);
        }
        let fromStoreId = this.listOfVoucherTransaction.find(c => c.vocherId == ele.vocherId.toString()).fromStoreId
        let toStoreId = this.listOfVoucherTransaction.find(c => c.vocherId == ele.vocherId.toString()).toStoreId
        if (fromStoreId != 0) {
          this.regform.get("fromStore").setValue(this.listofStore.find(c => c.id == this.listOfVoucherTransaction.find(c => c.vocherId == ele.vocherId.toString()).fromStoreId).id);
        }
        else if (toStoreId != 0) {
          this.regform.get("toStore").setValue(this.listofStore.find(c => c.id == this.listOfVoucherTransaction.find(c => c.vocherId == ele.vocherId.toString()).toStoreId).id);
        }
        //To check From Store and To Store
        if (toStoreId != 0) {
          this.ToStoreId = this.listofStore.find(c => c.id == this.listOfVoucherTransaction.find(c => c.vocherId == ele.vocherId.toString()).toStoreId).id
        }
        else if (toStoreId == 0) {
          this.ToStoreId = 0;
        }
        if (fromStoreId != 0) {
          this.fromStoreId = this.listofStore.find(c => c.id == this.listOfVoucherTransaction.find(c => c.vocherId == ele.vocherId.toString()).fromStoreId).id
        }
        else if (fromStoreId == 0) {
          this.fromStoreId = 0
        }
        //To check Customer Id and Vendor Id 
        if (Userid != 0) {
          this.userIds = this.listOfCustomer.find(c => c.id == Userid).id;
        }
        else if (Userid == 0) {
          this.userIds = 0;
        }
        if (vendorId != 0) {
          this.vendorIds = this.listOfVendor.find(c => c.id == +vendorId).id;
        }
        else if (vendorId == 0) {
          this.vendorIds = 0;
        }
        //To check Lineitem data with from balance data
        this.itemBalanceId = "";
        this.balanceService.getAllBalance().subscribe(listOfBalance => {
          let res = listOfBalance.filter(c => c.itemId == ele.ItemID);
          //this.itemBalanceId = res[0].id;
          //To check lineitem data with from voucherTransaction data
          this.voucherTransactionId = [];
          this.voucherTranationService.getAllVocher().subscribe(listOfVoucherTraData => {
            let voucherTraData = listOfVoucherTraData.filter(c => c.vocherId == ele.vocherId && c.itemId == ele.ItemID);
            // console.log(voucherTraData)
            if (voucherTraData.length > 0) {
              this.voucherTransactionId = voucherTraData[0].id;
              this.itemBalanceId = res.find(c => c.itemId == voucherTraData[0].ItemID).id
              let value = {
                // date: this.listOfVouchers.find(c => c.vocherId == ele.vocherId).date,
                voucherId: element.Order,
                ItemName: items.name,
                Quantity: ele.Quantity,
                Price: ele.Price,
                cost: ele.cost,
                Total: ele.subTotal,
                item: items.id,
                customer: this.userIds,
                vendor: this.vendorIds,
                fromStore: this.fromStoreId,
                toStore: this.ToStoreId,
                lineItemId: ele.id,
                itemBalanceId: this.itemBalanceId,
                voucherTransactionId: this.voucherTransactionId
              };
              this.ListOfItems.push(value);
              this.updateBalanceGrandTotal();
              console.log(this.ListOfItems);
            }
          });
        });
      });
    });
    this.paidForm.get("totalAmount").setValue(this.grandTotalCustomer || this.grandTotalVendor)
    this.paidForm.get("paid").setValue(this.paid);
  }

  fillData() {
    this.sharedService.voucherNumber.subscribe(res => {
      this.listOfV = res
      this.updateSetting = 1;
      this.ListOfItems = [];
      let order = this.listOfV.Order_Number
      let lineItemList = this.listOfLineItem.filter(c => c.vocherId == order)
      // console.log(lineItemList)
      lineItemList.forEach(ele => {
        let Userid = this.listOfVouchers.find(c => c.vocherId == ele.vocherId.toString()).userId
        let vendorId = this.listOfVouchers.find(c => c.vocherId == ele.vocherId.toString()).vendorId
        let items = this.listofItems.find(c => c.id == ele.ItemID)
        this.regform.get("date").setValue(this.listOfV.date);
        this.VocherNo = this.listOfV.Order_Number
        if (Userid != 0) {
          this.regform.get("customer").setValue(this.listOfCustomer.find(c => c.id == Userid).id);
        }
        else if (vendorId != 0) {
          this.regform.get("vendor").setValue(this.listOfVendor.find(c => c.id == +vendorId).id);
        }
        let fromStoreId = this.listOfVoucherTransaction.find(c => c.vocherId == ele.vocherId.toString()).fromStoreId
        let toStoreId = this.listOfVoucherTransaction.find(c => c.vocherId == ele.vocherId.toString()).toStoreId
        //To check From Store and To Store
        if (toStoreId != 0) {
          this.ToStoreId = this.listofStore.find(c => c.id == this.listOfVoucherTransaction.find(c => c.vocherId == ele.vocherId.toString()).toStoreId).id
        }
        else if (toStoreId == 0) {
          this.ToStoreId = 0;
        }
        if (fromStoreId !== 0) {
          this.fromStoreId = this.listofStore.find(c => c.id == this.listOfVoucherTransaction.find(c => c.vocherId == ele.vocherId.toString()).fromStoreId).id
        }
        else if (fromStoreId == 0) {
          this.fromStoreId = 0
        }
        //To check Customer Id and Vendor Id 
        if (Userid != 0) {
          this.userIds = this.listOfCustomer.find(c => c.id == Userid).id;
        }
        else if (Userid == 0) {
          this.userIds = 0;
        }
        if (vendorId !== 0) {
          this.vendorIds = this.listOfVendor.find(c => c.id == +vendorId).id;
        }
        else if (vendorId == 0) {
          this.vendorIds = 0;
        }
        //To check Lineitem data with from balance data
        this.itemBalanceId = "";
        this.balanceService.getAllBalance().subscribe(async listOfBalance => {
          let res = await listOfBalance.filter(c => c.itemId == ele.ItemID);
          //this.itemBalanceId = res[0].id;
          //To check lineitem data with from voucherTransaction data
          this.voucherTransactionId = [];
          this.voucherTranationService.getAllVocher().subscribe(async listOfVoucherTraData => {
            let voucherTraData = await listOfVoucherTraData.filter(c => c.vocherId == ele.vocherId && c.itemId == ele.ItemID);
            // console.log(voucherTraData)
            if (voucherTraData.length > 0) {
              this.voucherTransactionId = voucherTraData[0].id;
              this.itemBalanceId = res.find(c => c.itemId == voucherTraData[0].ItemID).id
              let value = {
                // date: this.listOfVouchers.find(c => c.vocherId == ele.vocherId).date,
                voucherId: order,
                ItemName: items.name,
                Quantity: ele.Quantity,
                Price: ele.Price,
                cost: ele.cost,
                Total: ele.subTotal,
                item: items.id,
                customer: this.userIds,
                vendor: this.vendorIds,
                fromStore: this.fromStoreId,
                toStore: this.ToStoreId,
                lineItemId: ele.id,
                itemBalanceId: this.itemBalanceId,
                voucherTransactionId: this.voucherTransactionId
              };
              this.ListOfItems.push(value);
              this.updateBalanceGrandTotal();
              console.log(this.ListOfItems);
            }
          });
        });
        if (fromStoreId != 0) {
          this.regform.get("fromStore").setValue(fromStoreId);
        }
        else if (toStoreId != 0) {
          this.regform.get("toStore").setValue(toStoreId);
        }
      });
      this.paidForm.get("totalAmount").setValue(this.grandTotalCustomer || this.grandTotalVendor)
      this.paidForm.get("paid").setValue(this.paid);
    })
  }

}
