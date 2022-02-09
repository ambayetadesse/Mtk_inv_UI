import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { SharedService } from 'src/app/Service/shared.service';
import { VendorsService } from 'src/app/Service/vendors.service';
import { Vendors } from 'src/Tabels/tabels-list';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.page.html',
  styleUrls: ['./sort.page.scss'],
})
export class SortPage implements OnInit {
  regform = this.fb.group({});
  sortN: any;
  listOfVendors: Vendors[];
  constructor(private fb: FormBuilder, private modelControler: ModalController,
    private shardService: SharedService, private vendorService: VendorsService) { }

  ngOnInit() {
    this.regform = this.fb.group({
      ascending: [''],
      descending: ['']
    })
    this.getVendorsList();
  }
 async getVendorsList() {
    this.vendorService.getAllVendor().subscribe(async res => {
      this.listOfVendors = await res;
    })
  }
  radioGroupChange(ev) {
    this.sortN = ev.detail.value;
    if (ev.detail.value === "Ascending") {
      this.listOfVendors.sort((a, b) => {
        const x = a.vendorName.toLowerCase();
        const y = b.vendorName.toLowerCase();
        if (x < y) {
          return -1;
        }
        if (x > y) {
          return 1;
        }
        return 0;
      })
      this.shardService.listOfVendorFromSorting.next(this.listOfVendors);
    }
    else {
      this.listOfVendors.sort((a, b) => {
        const x = a.vendorName.toLowerCase();
        const y = b.vendorName.toLowerCase();
        if (x > y) {
          return -1;
        }
        if (x < y) {
          return 1;
        }
        return 0;
      })
      this.shardService.listOfVendorFromSorting.next(this.listOfVendors);
    }

    this.modelControler.dismiss();
  }

}
