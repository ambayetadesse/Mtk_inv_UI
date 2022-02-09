import { Component, OnInit, ViewChild } from '@angular/core';
import { Customer, Items, LineItem, Lookup, reportDetail, reportType, StockAdjustment, Vendors, Vocher } from 'src/Tabels/tabels-list';
import { CustomerService } from '../Service/customer.service';
import { LookupService } from '../Service/lookup.service';
import { DxDataGridComponent } from 'devextreme-angular';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { LineItemsService } from '../Service/line-items.service';
import { VocherService } from '../Service/vocher.service';
import { ItemsService } from '../Service/items.service';
import { VendorsService } from '../Service/vendors.service';
import { StockAdjustmentService } from '../Service/stock-adjustment.service';
import { IonContent, LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {
  listOfReportDetails: any[];
  listOfCustomer: Customer[];
  customerDetail: boolean;
  voucherDetail: boolean;
  vendorProductDetails: boolean;
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent;
  lineItemList: any[];
  voucherList: Vocher[];
  ListOfItem: any[];
  TansactionData: any[] = [];
  vendorDetails: boolean;
  listOfVendor: Vendors[];
  listOfLineItemVendor: LineItem[];
  ListOfLookup: Lookup[];
  vendor: boolean;
  customer: boolean;
  allowSearch: boolean;
  columnChooserModes: any;
  saleAmountHeaderFilter: any;
  inventorySummary: boolean;
  listOfStore: Lookup[];
  storeId: string;
  storeDetails: boolean;
  storeList: any[] = [];
  storeBalance: boolean;
  listOfStores: any[] = [];
  listOfPaymentReport: any[] = [];
  vendorPayments: boolean;
  customerPayment: boolean;
  listOfGraphicalReport: any[] = [];
  graphcialReport: boolean;
  reportName: string;
  storetransfer: boolean;
  listOfStockAdjustment: any[];
  loader: HTMLIonLoadingElement;
  showScroll: boolean = false;
  @ViewChild('pageTop') pageTop: IonContent
  public pageScroller() {
    this.pageTop.scrollToTop();
  }
  constructor(private lookupService: LookupService,
    private customerService: CustomerService,
    private lineItemService: LineItemsService,
    private vocherService: VocherService,
    private itemsService: ItemsService,
    private vendorsService: VendorsService,
    private stockAdjustmentService: StockAdjustmentService,
    private loadingController:LoadingController
  ) { }
  ListofreportType: reportType[] = [];
  customerReportDetails: any[] = [];
  async ngOnInit() {
    this.loader = await this.loadingController.create({
      message: 'data loading ...',
      spinner: 'circles',
      animated: true,
      duration: 200
    });
    await this.loader.present().then();
    this.getLookup();
    this.Report_Type();
    this.readItem();
    this.getVonder();
    this.getCustomer();
    this.getStockAdjustment();
    this.allowSearch = true;
  }
  async readItem() {
    this.itemsService.getAllItem().subscribe(async result => {
      this.ListOfItem = await result;
    })
  }
  async scroll(ev) {
    const offset = ev.detail.scrollTop;
    this.showScroll = offset > 300;
  }
  async getLookup() {
    this.lookupService.getAllLookUp().subscribe(async lookupList => {
      this.ListOfLookup = await lookupList;
    })
  }
 async getStockAdjustment() {
    this.stockAdjustmentService.getAllStockAdjustment().subscribe(async res => {
      this.listOfStockAdjustment = await res;
    })
  }
  Report_Type() {
    let r1 = {
      id: '1',
      name: 'Customer Report'
    }
    this.ListofreportType.push(r1);
    let r2 = {
      id: '2',
      name: ' Voucher Report'
    }
    this.ListofreportType.push(r2);
    let r3 = {
      id: '3',
      name: 'Store Report'
    }
    this.ListofreportType.push(r3);
    let r4 = {
      id: '4',
      name: 'Graphical Report'
    }
    this.ListofreportType.push(r4);
    let r5 = {
      id: '5',
      name: 'Payment and Accounting'
    }
    this.ListofreportType.push(r5);
    let graphicalReport = {
      Id: '9',
      reportTypeId: '4',
      Name: 'Dashboard'
    }
    this.listOfGraphicalReport.push(graphicalReport)
    let paymentAccountlist1 = {
      Id: '17',
      reportTypeId: '5',
      Name: 'Vendor Payment Details'
    }
    this.listOfPaymentReport.push(paymentAccountlist1);
    let paymentAccountlist2 = {
      Id: '8',
      reportTypeId: '5',
      Name: 'Customer Payments'
    }
    this.listOfPaymentReport.push(paymentAccountlist2);
    let d1 = {
      Id: '10',
      reportTypeId: '1',
      Name: "Customer Detail"
    }
    this.customerReportDetails.push(d1)
    let d2 = {
      Id: '11',
      reportTypeId: '1',
      Name: "Vonder Detail"
    }
    this.customerReportDetails.push(d2)
    let d4 = {
      Id: '12',
      reportTypeId: '1',
      Name: "Vendor Product List"
    }
    this.customerReportDetails.push(d4)
    let d5 = {
      Id: '13',
      reportTypeId: '1',
      Name: "Inventory Summary Report"
    }
    this.customerReportDetails.push(d5)
    let d6 = {
      Id: '14',
      reportTypeId: '1',
      Name: "Store Transfer Report"
    }
    this.customerReportDetails.push(d6)
  }
  async ReportType(ev) {
    //console.log(ev.target.value);
    if (ev.target.value == 1) {
      this.listOfReportDetails = this.customerReportDetails.filter(c => c.reportTypeId == ev.target.value)
    }
    else if (ev.target.value == 2) {
      this.listOfReportDetails = [];
      const x = this.customerReportDetails.filter(c => c.reportTypeId == '2')
      // if (x.length == 0) {
        this.ListOfLookup.filter(c => c.type == 1).forEach(element => {
          //console.log(element);
          if (element.name != "Store Transfer") {
            let vt = {
              Id: element.id,
              reportTypeId: '2',
              Name: element.name
            }
            this.customerReportDetails.push(vt)
            this.listOfReportDetails.push(vt);
          }
        });
     //}
    }
    else if (ev.target.value == 3) {
      this.listOfReportDetails = [];
      const x = this.customerReportDetails.filter(c => c.reportTypeId == '3')
      // if (x.length == 0) {
        this.lookupService.getAllLookUp().subscribe(async result => {
          // console.log(result)
          this.listOfStore = await result.filter(c => c.type == 3);
          this.listOfStore.forEach(element => {
            //console.log(element);
            let store = {
              Id: element.id,
              reportTypeId: '3',
              Name: element.name
            }
            this.customerReportDetails.push(store)
            this.listOfReportDetails.push(store);
          });
        })
      // }
    }
    else if (ev.target.value == 5) {
      this.listOfReportDetails = [];
      this.listOfReportDetails = this.listOfPaymentReport.filter(c => c.reportTypeId == ev.target.value);
    }
    else if (ev.target.value == 4) {
      this.listOfReportDetails = [];
      this.listOfReportDetails = this.listOfGraphicalReport.filter(c => c.reportTypeId == ev.target.value);
    }

  }
 async ReportDetails($event) {
    if ($event.target.value == 10) {
      this.customerDetail = true;
      this.reportName = "Customer details report";
      this.voucherDetail = false;
      this.vendorDetails = false;
      this.vendorProductDetails = false;
      this.vendor = false;
      this.customer = false;
      this.inventorySummary = false;
      this.storeBalance = false;
      await this.getCustomer();
      this.vendorPayments = false;
      this.customerPayment = false;
      this.graphcialReport = false;
      this.storetransfer = false;
    }
    else if ($event.target.value == 11) {
      this.vendorDetails = true;
      this.reportName = "Vendor details report";
      this.customerDetail = false;
      this.voucherDetail = false;
      this.vendorProductDetails = false;
      this.vendor = false;
      this.customer = false;
      this.inventorySummary = false;
      this.storeBalance = false;
      this.vendorPayments = false;
      this.customerPayment = false;
      this.graphcialReport = false;
      this.storetransfer = false;
     await this.getVonder();
    }
    else if ($event.target.value == 12) {
      this.vendorProductDetails = true;
      this.reportName = "Vendor product details report";
      this.vendorDetails = false;
      this.customerDetail = false;
      this.voucherDetail = false;
      this.vendor = false;
      this.customer = false;
      this.inventorySummary = false;
      this.storeBalance = false;
      this.vendorPayments = false;
      this.customerPayment = false;
      this.graphcialReport = false;
      this.storetransfer = false;
      // this.getVonderProduct();
    }
    else if ($event.target.value == 13) {
      this.inventorySummary = true;
      this.reportName = "Inventory summary report";
      this.vendorProductDetails = false;
      this.vendorDetails = false;
      this.customerDetail = false;
      this.voucherDetail = false;
      this.vendor = false;
      this.customer = false;
      this.storeBalance = false;
      this.vendorPayments = false;
      this.customerPayment = false;
      this.graphcialReport = false;
      this.storetransfer = false;
    }
    else if ($event.target.value == 14) {
      this.storetransfer = true;
      this.inventorySummary = false;
      this.reportName = "Store Transfer report";
      this.vendorProductDetails = false;
      this.vendorDetails = false;
      this.customerDetail = false;
      this.voucherDetail = false;
      this.vendor = false;
      this.customer = false;
      this.storeBalance = false;
      this.vendorPayments = false;
      this.customerPayment = false;
      this.graphcialReport = false;
    }
    else if ($event.target.value == 17) {
      this.vendorPayments = true;
      this.reportName = "Vendor Payments report";
      this.customerPayment = false;
      this.inventorySummary = false;
      this.vendorProductDetails = false;
      this.vendorDetails = false;
      this.customerDetail = false;
      this.voucherDetail = false;
      this.vendor = false;
      this.customer = false;
      this.storeBalance = false;
      this.graphcialReport = false;
      this.storetransfer = false;
    }
    else if ($event.target.value == 8) {
      this.vendorPayments = false;
      this.customerPayment = true;
      this.reportName = "Customer Payments report";
      this.inventorySummary = false;
      this.vendorProductDetails = false;
      this.vendorDetails = false;
      this.customerDetail = false;
      this.voucherDetail = false;
      this.vendor = false;
      this.customer = false;
      this.storeBalance = false;
      this.graphcialReport = false;
      this.storetransfer = false;
    }
    else if ($event.target.value == 9) {
      this.graphcialReport = true;
      this.reportName = "Graghical report";
      this.vendorPayments = false;
      this.customerPayment = false;
      this.inventorySummary = false;
      this.vendorProductDetails = false;
      this.vendorDetails = false;
      this.customerDetail = false;
      this.voucherDetail = false;
      this.vendor = false;
      this.customer = false;
      this.storeBalance = false;
      this.storetransfer = false;
    }
    else if ($event.target.value == 1 || $event.target.value == 2 || $event.target.value == 3 || $event.target.value == 4 || $event.target.value == 5) {
      this.voucherDetail = true;
      await this.getvoucher($event.target.value);
    }
    else {
      this.lookupService.getAllLookUp().subscribe(async result => {
        this.listOfStore = await result.filter(c => c.type == 3);
        console.log(result)
        let b = this.listOfStore.find(c => c.id == $event.target.value);
        if (b != null) {
          this.storeDetails = true;
         await this.getStore($event.target.value);
        }
        else {
          // this.voucherDetail = true;
          // this.getvoucher($event.target.value);
        }
      })
    }
  }
  exportGrid($event) {
    const doc = new jsPDF();
    exportDataGridToPdf({
      jsPDFDocument: doc,
      component: this.dataGrid.instance
    }).then(() => {
      doc.save('Customers.pdf');
    })
  }

  async getCustomer() {
    this.customerService.getAllCustomer().subscribe(async res => {
      this.listOfCustomer = await res;
     // console.log(res);
    })
  }
  async getVonder() {
    this.vendorsService.getAllVendor().subscribe(async res => {
      this.listOfVendor = await res;
    })
  }
  async getStore($eve) {
    // this.shardService.storeId.next($eve);
    this.storeBalance = true;
    this.inventorySummary = false;
    this.vendorProductDetails = false;
    this.vendorDetails = false;
    this.customerDetail = false;
    this.voucherDetail = false;
    this.vendor = false;
    this.customer = false;
    this.vendorPayments = false;
    this.customerPayment = false;
    this.graphcialReport = false;
    this.storetransfer = false;
    this.listOfStores = [];
    this.ListOfItem.forEach(el => {
      let stock = this.listOfStockAdjustment.find(c => c.store == $eve && c.itemId == el.id);
      if (stock !== undefined) {
        let storeList = {
          picture: el.picture,
          name: el.name,
          Cost: el.price,
          Quantity: stock.quantityAfter,
          Total_Cost_Value: el.quantity * el.price
        }
        this.listOfStores.push(storeList);
      }
    })
  }
  async getvoucher($eve) {
    this.TansactionData = [];
    this.lineItemService.getAllLineItem().subscribe(async result => {
      this.lineItemList = await result;
      this.vocherService.getAllVocher().subscribe(res => {
        this.voucherList = res.filter(c => c.vocherTypeId == $eve);
        if (this.voucherList.length > 0) {
          let customerName = this.voucherList.find(c => c.vocherTypeId == $eve).userId;
          //   let vendorName = this.voucherList.find(c => c.vocherTypeId == $eve).vendor;
          if (customerName === null || customerName == 0) {
            this.vendor = true;
            let voucherName = this.ListOfLookup.find(c => c.id === $eve).name;
            this.reportName = voucherName + " report";
            this.customer = false;
            this.vendorProductDetails = false;
            this.vendorDetails = false;
            this.customerDetail = false;
            this.voucherDetail = false;
            this.inventorySummary = false;
            this.storeBalance = false;
            this.vendorPayments = false;
            this.customerPayment = false;
            this.graphcialReport = false;
            this.storetransfer = false;
            res.filter(c => c.vocherTypeId == $eve).forEach(element => {
              let litem = this.lineItemList.filter(c => c.vocherId == element.vocherId)
              if (litem.length > 0) {
                litem.forEach(el => {
                  let ItemName = "";
                  let ItemAmaricName = "";
                  let IN = this.ListOfItem.find(c => c.id == el.itemId)
                  if (IN != null)
                    ItemName = IN.name;
                  ItemAmaricName = IN.amaricName
                  let lit = {
                    vocherId: element.vocherId,
                    ItemID: el.ItemID,
                    ItemName: ItemName,
                    ItemAmaricName: ItemAmaricName,
                    Quantity: el.quantity,
                    Date: element.date,
                    Vendor_name: this.listOfVendor.find((c) => c.id == element.vendorId).vendorName,
                    Cost: el.cost,
                    subTotal: el.subTotal,
                    taxAmount: element.taxAmount,
                    GT: element.grandTotal,
                  }
                  this.TansactionData.push(lit);
                });
                // console.log(this.TansactionData);
              }
            });
          }
          else {
            res.filter(c => c.vocherTypeId == $eve).forEach(element => {
              let litem = this.lineItemList.filter(c => c.vocherId == element.vocherId)
              if (litem.length > 0) {
                this.customer = true;
                let voucherName = this.ListOfLookup.find(c => c.id === $eve).name;
                this.reportName = voucherName + " report";
                this.vendor = false;
                this.vendorProductDetails = false;
                this.vendorDetails = false;
                this.customerDetail = false;
                this.voucherDetail = false;
                this.inventorySummary = false;
                this.storeBalance = false;
                this.vendorPayments = false;
                this.customerPayment = false;
                this.graphcialReport = false;
                this.storetransfer = false;
                litem.forEach(el => {
                  let ItemName = "";
                  let ItemAmaricName = "";
                  let IN = this.ListOfItem.find(c => c.id == el.itemId)
                  if (IN != null)
                    ItemName = IN.name;
                  ItemAmaricName = IN.amaricName;
                  let lit = {
                    vocherId: element.vocherId,
                    ItemID: el.ItemID,
                    ItemName: ItemName,
                    ItemAmaricName: ItemAmaricName,
                    Quantity: el.quantity,
                    Date: element.date,
                    Customer: this.listOfCustomer.find(c => c.id == element.userId).fullname,
                    Price: el.price,
                    subTotal: el.subTotal,
                    taxAmount: element.taxAmount,
                    GT: element.grandTotal,
                  }
                  this.TansactionData.push(lit);
                });
              }
            })
          }
        }

      })
    }, async (error) => {
      await this.loader.dismiss().then()
      console.log(error);
    });
  }
  refresh() {
    console.log("event")
    let ev;
    this.ReportType(ev);
  }
}
