import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VocherPageRoutingModule } from './vocher-routing.module';
import { VocherPage } from './vocher.page';
import { DxLookupModule, DxTemplateModule } from 'devextreme-angular';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { DxPopoverModule } from 'devextreme-angular';
import { DxActionSheetModule, DxListModule,DxDataGridModule } from 'devextreme-angular';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VocherPageRoutingModule,
    ReactiveFormsModule,
    DxLookupModule,
    DxTemplateModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    DxPopoverModule,
    DxActionSheetModule, DxListModule,
    DxDataGridModule
  ],
  declarations: [VocherPage]
})
export class VocherPageModule {}
