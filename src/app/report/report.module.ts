import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportPageRoutingModule } from './report-routing.module';

import { ReportPage } from './report.page';
import { DxDataGridModule, DxButtonModule } from 'devextreme-angular';
import { CustomerDetailsPage } from "./customer-details/customer-detailsPage";
import { VonderDetailsPage } from './vonder-details/vonder-details.page';
import { VendorProductDetailPage } from "./vendor-product-detail/VendorProductDetailPage";
import { InventorySummaryPage } from './inventory-summary/inventory-summary.page';
import { VendorPaymentPage } from './vendor-payment/vendor-payment.page';
import { CustomerPaymentPage } from './customer-payment/customer-payment.page';
import { GraphicalReportPage } from './graphical-report/graphical-report.page';
import { DxChartModule, DxFormModule, DxSelectBoxModule, DxTabPanelModule } from 'devextreme-angular';
import { StoreTransferReportPage } from './store-transfer-report/store-transfer-report.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportPageRoutingModule,
    ReactiveFormsModule,
    DxButtonModule,
    DxChartModule,
    DxDataGridModule, DxFormModule, DxSelectBoxModule, DxTabPanelModule
  ],
  entryComponents:[],
  declarations: [ReportPage,CustomerDetailsPage,VonderDetailsPage,VendorProductDetailPage
    ,InventorySummaryPage,VendorPaymentPage,CustomerPaymentPage,GraphicalReportPage,
    StoreTransferReportPage ]
})
export class ReportPageModule {}
