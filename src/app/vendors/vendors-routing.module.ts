import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VendorsPage } from './vendors.page';

const routes: Routes = [
  {
    path: '',
    component: VendorsPage
  },  {
    path: 'filter',
    loadChildren: () => import('./filter/filter.module').then( m => m.FilterPageModule)
  },
  {
    path: 'sort',
    loadChildren: () => import('./sort/sort.module').then( m => m.SortPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendorsPageRoutingModule {}
