import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GraphicalReportPageRoutingModule } from './graphical-report-routing.module';
import { DxChartModule } from 'devextreme-angular';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GraphicalReportPageRoutingModule,
    DxChartModule,ReactiveFormsModule
  ],
  declarations: []
})
export class GraphicalReportPageModule {}
