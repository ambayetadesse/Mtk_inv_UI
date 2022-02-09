import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { DxDataGridComponent } from 'devextreme-angular';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { ItemsService } from 'src/app/Service/items.service';
import { LineItemsService } from 'src/app/Service/line-items.service';
import { VendorsService } from 'src/app/Service/vendors.service';
import { VocherService } from 'src/app/Service/vocher.service';
import { Items, Vocher } from 'src/Tabels/tabels-list';

@Component({
  selector: 'app-vendor-product-detail',
  templateUrl: './vendor-product-detail.page.html',
  styleUrls: ['./vendor-product-detail.page.scss'],
})
export class VendorProductDetailPage implements OnInit {
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent;
  listOfLineItemVendor: any;
  ListOfItem: Items[];
  VendorProductData: any[] = [];
  listOfVendors: any[];
  allowSearch: boolean;
  listOfVoucher: Vocher[];
  loader: any;
  constructor(private lineItemService: LineItemsService,
    private itemsService: ItemsService,
    private vendorService: VendorsService,
    private vocherService: VocherService,
    private loadingController: LoadingController) { }

  async ngOnInit() {
    this.loader = await this.loadingController.create({
      message: 'Loading Data ....',
      spinner: "bubbles",
      animated: true,
      duration:200
    })
    await this.loader.present().then();
    this.getItem();
    this.getVendor();
    this.getVonderProduct();
    this.getVocher();
  }
 async getItem() {
    this.itemsService.getAllItem().subscribe(async result => {
      await this.loader.present().then();
      this.ListOfItem = await result;
    }, async (err) => {
      await this.loader.dismiss().then();
      console.log(err);
    });
  }
  async getVendor() {
    this.vendorService.getAllVendor().subscribe(async vendorList => {
      this.listOfVendors = await vendorList;
    }, async (err) => {
      await this.loader.dismiss().then();
      console.log(err);
    });
  }
  getVocher() {
    this.vocherService.getAllVocher().subscribe(async res => {
      await this.loader.dismiss().then();
      this.listOfVoucher = await res;
    }, async (err) => {
      await this.loader.dismiss().then();
      console.log(err);
    });
  }
  getVonderProduct() {
    this.allowSearch = true
    this.lineItemService.getAllLineItem().subscribe(async res => {
      await this.loader.dismiss().then();
      if (this.ListOfItem != undefined) {
        await res.forEach(el => {
          let voucherTypeId = el.vocherId
          let vocherTypeId = voucherTypeId.substring(0, 2);
          if (vocherTypeId == "GR" || vocherTypeId == "PO") {
            this.vocherService.getAllVocher().subscribe(res => {
              let voucher = res.find(c => c.vocherId == el.vocherId)
              let ItemName = "";
              let picture = "";
              let IN = this.ListOfItem.find(c => c.id == el.itemId);
              if (IN != null)
                ItemName = IN.name;
              picture = IN.picture;
              let vendList = {
                ItemID: el.itemId,
                ItemName: ItemName,
                Quantity: el.quantity,
                Cost: el.cost,
                picture: picture,
                VendorName: this.listOfVendors.find(c => c.id == voucher.vendorId).vendorName
              };
              this.VendorProductData.push(vendList);
            })
            console.log(this.VendorProductData)
          }
        });
      }
      else {
        this.getItem();
        this.getVonderProduct();
      }
    }, async (err) => {
      await this.loader.dismiss().then();
      console.log(err);
    });
  }
  exportGrid($event) {
    const doc = new jsPDF();
    exportDataGridToPdf({
      jsPDFDocument: doc,
      component: this.dataGrid.instance
    }).then(() => {
      doc.save('Customers.pdf');
    });
  }
}
