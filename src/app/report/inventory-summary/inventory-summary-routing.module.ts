import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InventorySummaryPage } from './inventory-summary.page';

const routes: Routes = [
  {
    path: '',
    component: InventorySummaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventorySummaryPageRoutingModule {}
