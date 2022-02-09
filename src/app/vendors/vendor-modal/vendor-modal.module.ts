import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular'
import { VendorModalPageRoutingModule } from './vendor-modal-routing.module';
import { VendorModalPage } from './vendor-modal.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { DxDataGridModule,DxButtonModule } from 'devextreme-angular';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VendorModalPageRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    DxDataGridModule,DxButtonModule
  ],
  declarations: [VendorModalPage]
})
export class VendorModalPageModule {}
