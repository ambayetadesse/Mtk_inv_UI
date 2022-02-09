import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportPage } from './report.page';

const routes: Routes = [
  {
    path: '',
    component: ReportPage
  },
 
  {
    path: 'customer-details',
    loadChildren: () => import('./customer-details/customer-details.module').then( m => m.CustomerDetailsPageModule)
  },
  {
    path: 'vonder-details',
    loadChildren: () => import('./vonder-details/vonder-details.module').then( m => m.VonderDetailsPageModule)
  },
  {
    path: 'vendor-product-detail',
    loadChildren: () => import('./vendor-product-detail/vendor-product-detail.module').then( m => m.VendorProductDetailPageModule)
  },
  {
    path: 'inventory-summary',
    loadChildren: () => import('./inventory-summary/inventory-summary.module').then( m => m.InventorySummaryPageModule)
  },
  {
    path: 'vendor-payment',
    loadChildren: () => import('./vendor-payment/vendor-payment.module').then( m => m.VendorPaymentPageModule)
  },
  {
    path: 'customer-payment',
    loadChildren: () => import('./customer-payment/customer-payment.module').then( m => m.CustomerPaymentPageModule)
  },
  {
    path: 'graphical-report',
    loadChildren: () => import('./graphical-report/graphical-report.module').then( m => m.GraphicalReportPageModule)
  },
  {
    path: 'store-transfer-report',
    loadChildren: () => import('./store-transfer-report/store-transfer-report.module').then( m => m.StoreTransferReportPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportPageRoutingModule {}
