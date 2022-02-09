import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GraphicalReportPage } from './graphical-report.page';

const routes: Routes = [
  {
    path: '',
    component: GraphicalReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GraphicalReportPageRoutingModule {}
