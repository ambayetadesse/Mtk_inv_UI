import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SortPageRoutingModule } from './sort-routing.module';

import { SortPage } from './sort.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SortPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [SortPage]
})
export class SortPageModule {}
