import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { StoreTransferReportPageRoutingModule } from './store-transfer-report-routing.module';
import { DxButtonModule, DxDataGridModule } from 'devextreme-angular';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoreTransferReportPageRoutingModule,
    DxButtonModule, DxDataGridModule
  ],
  declarations: []
})
export class StoreTransferReportPageModule {}
