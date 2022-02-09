import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CustomerPaymentPageRoutingModule } from './customer-payment-routing.module';
import { DxDataGridModule,DxButtonModule } from 'devextreme-angular';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomerPaymentPageRoutingModule,
    DxDataGridModule,DxButtonModule
  ],
  declarations: []
})
export class CustomerPaymentPageModule {}
