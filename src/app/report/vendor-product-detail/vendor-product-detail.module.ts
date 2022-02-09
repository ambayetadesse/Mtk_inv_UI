import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { VendorProductDetailPageRoutingModule } from './vendor-product-detail-routing.module';
import { DxDataGridModule,DxButtonModule } from 'devextreme-angular';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DxButtonModule,DxDataGridModule,
    VendorProductDetailPageRoutingModule
  ],
  declarations: []
})
export class VendorProductDetailPageModule {}
