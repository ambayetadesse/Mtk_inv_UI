import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VonderDetailsPage } from './vonder-details.page';

const routes: Routes = [
  {
    path: '',
    component: VonderDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VonderDetailsPageRoutingModule {}
