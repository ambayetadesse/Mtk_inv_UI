import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VendorPaymentPage } from './vendor-payment.page';

const routes: Routes = [
  {
    path: '',
    component: VendorPaymentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendorPaymentPageRoutingModule {}
