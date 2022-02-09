import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { DxDataGridComponent } from 'devextreme-angular';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { CustomerService } from 'src/app/Service/customer.service';
import { VocherService } from 'src/app/Service/vocher.service';
import { Customer } from 'src/Tabels/tabels-list';
@Component({
  selector: 'app-customer-payment',
  templateUrl: './customer-payment.page.html',
  styleUrls: ['./customer-payment.page.scss'],
})
export class CustomerPaymentPage implements OnInit {
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent;
  listOfCustomer: Customer[];
  customerPayment: any[] = [];
  allowSearch: boolean
  loader: any
  constructor(private customerService: CustomerService,
    private voucherService: VocherService,
    private loadingController: LoadingController) { }

  async ngOnInit() {
    this.loader = await this.loadingController.create({
      message: 'Data loading ...',
      spinner: 'circles',
      animated: true
    });
    await this.loader.present().then();
    this.getCustomer();
    this.getCustomerPaymenent();
  }
  getCustomer() {
    this.allowSearch = true;
    this.customerService.getAllCustomer().subscribe(async re => {
      await this.loader.dismiss().then();
      this.listOfCustomer = re;
    }, async (err) => {
      await this.loader.dismiss().then();
      console.log(err);
    })
  }
  getCustomerPaymenent() {
    this.allowSearch = true;
    this.voucherService.getAllVocher().subscribe(async result => {
      await this.loader.dismiss().then();
      if (this.listOfCustomer != undefined) {
        result.filter(c => c.vendorId == 0).forEach(element => {
          let balance = this.listOfCustomer.find(c => c.id == element.userId).balance;
          let listOfCustomerPayment = {
            contact: this.listOfCustomer.find(c => c.id == element.userId).fullname,
            phone_number: this.listOfCustomer.find(c => c.id == element.userId).phonenumber,
            date: element.date,
            Order_Number: element.vocherId,
            Sales_Total: element.subTotal,
            Paid_Total: balance - element.subTotal,
            Balance: balance,
          }
          this.customerPayment.push(listOfCustomerPayment);
        });
      }
      else {
        this.getCustomer();
        this.getCustomerPaymenent();
      }
    }, async (err) => {
      await this.loader.dismiss().then();
      console.log(err);
    });
  }
  exportGrid($event) {
    //const byteArray = new Uint8Array(atob($event.data).split('').map(char => char.charCodeAt(0)));
    //new Blob([byteArray], {type: 'application/pdf'});
    const doc = new jsPDF();
    exportDataGridToPdf({
      jsPDFDocument: doc,
      component: this.dataGrid.instance
    }).then(() => {
      doc.save('Customers.pdf');
    });
  }
}
