import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerService } from 'src/app/Service/customer.service';
import { Customer } from 'src/Tabels/tabels-list';
import { DxDataGridComponent } from 'devextreme-angular';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.page.html',
  styleUrls: ['./customer-details.page.scss'],
})
export class CustomerDetailsPage implements OnInit {
  listOfCustomer: Customer[];
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent;
  allowSearch: boolean;
  loader: HTMLIonLoadingElement;
  constructor(private customerService: CustomerService,
    private loadingController: LoadingController) { }

  async ngOnInit() {
    this.loader = await this.loadingController.create({
      message: 'Data Loading ...',
      spinner: 'circles',
      animated: true
    });
    await this.loader.present().then();
    this.getCustomer();
  }
  getCustomer() {
    this.allowSearch = true;
    this.customerService.getAllCustomer().subscribe(async res => {
      await this.loader.dismiss().then();
      this.listOfCustomer = res;
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
    })
  }
}
