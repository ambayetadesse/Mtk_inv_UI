import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InventorySummaryPageRoutingModule } from './inventory-summary-routing.module';
import { DxButtonModule, DxDataGridModule } from 'devextreme-angular';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,DxButtonModule,DxDataGridModule,
    InventorySummaryPageRoutingModule
  ],
  declarations: []
})
export class InventorySummaryPageModule {}
