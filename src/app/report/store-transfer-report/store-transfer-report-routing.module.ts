import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoreTransferReportPage } from './store-transfer-report.page';

const routes: Routes = [
  {
    path: '',
    component: StoreTransferReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreTransferReportPageRoutingModule {}
