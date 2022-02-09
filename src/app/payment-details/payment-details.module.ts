import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PaymentDetailsPageRoutingModule } from './payment-details-routing.module';
import { PaymentDetailsPage } from './payment-details.page';
import { DxLookupModule, DxTemplateModule } from 'devextreme-angular';
import { DxPopoverModule } from 'devextreme-angular';
import { DxDataGridModule, DxButtonModule } from 'devextreme-angular';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    PaymentDetailsPageRoutingModule,
    DxLookupModule, DxTemplateModule,
    DxPopoverModule,DxDataGridModule, DxButtonModule
  ],
  declarations: [PaymentDetailsPage]
})
export class PaymentDetailsPageModule {}
