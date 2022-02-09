import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { VonderDetailsPageRoutingModule } from './vonder-details-routing.module';
import { DxDataGridModule,DxButtonModule } from 'devextreme-angular';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VonderDetailsPageRoutingModule,
    DxDataGridModule,DxButtonModule
  ],
  declarations: []
})
export class VonderDetailsPageModule {}
