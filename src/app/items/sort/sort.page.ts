import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ItemsService } from 'src/app/Service/items.service';
import { SharedService } from 'src/app/Service/shared.service';
import { Items } from 'src/Tabels/tabels-list';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.page.html',
  styleUrls: ['./sort.page.scss'],
})
export class SortPage implements OnInit {
  regform = this.fb.group({});
  listOfItems: Items[];
  sortN: any;
  constructor(private fb: FormBuilder,
    private itemsService: ItemsService,
    private shardService: SharedService,
    private modelControler: ModalController) { }

  ngOnInit() {
    this.regform = this.fb.group({
      ascending: [''],
      descending: ['']
    })
    this.getItems();
  }
  async getItems() {
    this.itemsService.getAllItem().subscribe(async res => {
      this.listOfItems = await res;
    })
  }
  radioGroupChange(ev) {
    this.sortN = ev.detail.value;
    if (ev.detail.value === "Ascending") {
      this.listOfItems.sort((a, b) => {
        const x = a.name.toLowerCase();
        const y = b.name.toLowerCase();
        if (x < y) {
          return -1;
        }
        if (x > y) {
          return 1;
        }
        return 0;
      })
      this.shardService.listOfItems.next(this.listOfItems);
     }
    else if (ev.detail.value === "Descending") {
      this.listOfItems.sort((a, b) => {
        const x = a.name.toLowerCase();
        const y = b.name.toLowerCase();
        if (x > y) {
          return -1;
        }
        if (x < y) {
          return 1;
        }
        return 0;
      })
      this.shardService.listOfItems.next(this.listOfItems);
    }
    else if (ev.detail.value === "AscendingQuantity") {
      this.listOfItems.sort((a, b) => {
        return a.quantity - b.quantity;
      })
      this.shardService.listOfItems.next(this.listOfItems);
    }
    else {
      this.listOfItems.sort((a, b) => {
        return b.quantity - a.quantity;
      })
      this.shardService.listOfItems.next(this.listOfItems);
    }
    this.shardService.sortName.next(this.sortN);
    this.modelControler.dismiss();
  }
}
