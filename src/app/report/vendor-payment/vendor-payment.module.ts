import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { VendorPaymentPageRoutingModule } from './vendor-payment-routing.module';
import { DxButtonModule, DxDataGridModule } from 'devextreme-angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VendorPaymentPageRoutingModule,
    DxDataGridModule,DxButtonModule
  ],
  declarations: []
})
export class VendorPaymentPageModule {}
