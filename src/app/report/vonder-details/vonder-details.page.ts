import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { DxDataGridComponent } from 'devextreme-angular';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { VendorsService } from 'src/app/Service/vendors.service';
import { Vendors } from 'src/Tabels/tabels-list';
@Component({
  selector: 'app-vonder-details',
  templateUrl: './vonder-details.page.html',
  styleUrls: ['./vonder-details.page.scss'],
})
export class VonderDetailsPage implements OnInit {
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent;
  listOfVendor: Vendors[];
  allowSearch:boolean;
  loader: HTMLIonLoadingElement;
  constructor(private vendorsService:VendorsService,private loadingController:LoadingController) { }

  async ngOnInit() {
    this.loader = await this.loadingController.create({
      message: 'data loading ...',
      spinner: 'circles',
      animated: true,
      duration: 200
    });
    await this.loader.present().then();
    this.getVonder();
    this.allowSearch=true;
  }
  getVonder(){
    this.vendorsService.getAllVendor().subscribe(async res=>{
      this.listOfVendor = await res;
    })
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
