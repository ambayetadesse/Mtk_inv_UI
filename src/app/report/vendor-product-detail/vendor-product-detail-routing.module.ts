import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VendorProductDetailPage } from "./VendorProductDetailPage";

const routes: Routes = [
  {
    path: '',
    component: VendorProductDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendorProductDetailPageRoutingModule {}
