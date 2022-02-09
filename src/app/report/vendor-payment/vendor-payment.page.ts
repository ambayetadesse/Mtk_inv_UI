import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { DxDataGridComponent } from 'devextreme-angular';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { element } from 'protractor';
import { VendorsService } from 'src/app/Service/vendors.service';
import { VocherService } from 'src/app/Service/vocher.service';
import { Vendors, Vocher } from 'src/Tabels/tabels-list';
@Component({
  selector: 'app-vendor-payment',
  templateUrl: './vendor-payment.page.html',
  styleUrls: ['./vendor-payment.page.scss'],
})
export class VendorPaymentPage implements OnInit {
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent;
  listOfVendor: Vendors[];
  vendorPayment: any[] = [];
  allowSearch: boolean
  loader: any;
  constructor(private vocherService: VocherService, private vendorsService: VendorsService, private loadingController: LoadingController) { }

  async ngOnInit() {
    this.loader = await this.loadingController.create({
      message: 'loading ....',
      spinner: 'bubbles',
      animated: true
    });
    await this.loader.present().then();
    this.getVendor();
    this.getVendorPayment();
  }
  getVendor() {
    this.vendorsService.getAllVendor().subscribe(async result => {
      await this.loader.dismiss().then();
      this.listOfVendor = await result;
    }, async (err) => {
      await this.loader.dismiss().then();
      console.log(err);
    });
  }
  getVendorPayment() {
    this.allowSearch = true;
    this.vocherService.getAllVocher().subscribe(async res => {
      await this.loader.dismiss().then();
      if (this.listOfVendor != undefined) {
       await res.filter(c => c.userId == 0).forEach(element => {
          let balance = parseFloat(this.listOfVendor.find(c => c.id == element.vendorId).balance);
          let listOfPaymentV = {
            vendorName: this.listOfVendor.find(c => c.id == element.vendorId).vendorName,
            Order_Number: element.vocherId,
            date: element.date,
            subTotal: element.subTotal,
            Amount: balance - element.subTotal,
          }
          this.vendorPayment.push(listOfPaymentV);
        });
      }
      else {
        this.getVendor();
        this.getVendorPayment();
      }
    }, async (err) => {
      await this.loader.dismiss().then();
      console.log(err);
    })
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
