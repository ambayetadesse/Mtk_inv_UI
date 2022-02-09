import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ItemsPageRoutingModule } from './items-routing.module';
import { ItemsPage } from './items.page';
import { DxLookupModule, DxTemplateModule,DxListModule,DxDataGridModule,
       DxSelectBoxModule,DxButtonModule } from 'devextreme-angular';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPage } from './filter/filter.page';
import { ItemHistoryPage } from './item-history/item-history.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ItemsPageRoutingModule,
    DxLookupModule, 
    DxTemplateModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    DxListModule,DxDataGridModule, DxSelectBoxModule,DxButtonModule
  ],
  declarations: [ItemsPage],
  entryComponents: [FilterPage,ItemHistoryPage]
})
export class ItemsPageModule {}
