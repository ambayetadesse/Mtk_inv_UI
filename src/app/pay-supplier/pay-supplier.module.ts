import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { DxButtonModule, DxDataGridModule, DxListModule, DxLookupModule, DxSelectBoxModule, DxTemplateModule } from 'devextreme-angular';
import { IonicModule } from '@ionic/angular';

import { PaySupplierPageRoutingModule } from './pay-supplier-routing.module';

import { PaySupplierPage } from './pay-supplier.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    DxLookupModule,
    DxTemplateModule,
    PaySupplierPageRoutingModule,
    DxListModule,DxDataGridModule,
    DxSelectBoxModule,DxButtonModule
  ],
  declarations: [PaySupplierPage]
})
export class PaySupplierPageModule {}
