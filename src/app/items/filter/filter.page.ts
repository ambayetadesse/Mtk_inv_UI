import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { ItemCategoryService } from 'src/app/Service/item-category.service';
import { ItemsService } from 'src/app/Service/items.service';
import { SharedService } from 'src/app/Service/shared.service';
import { ItemCategory, Items } from 'src/Tabels/tabels-list';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
})
export class FilterPage implements OnInit {
  regform1 = this.fb.group({});
  ListOfItemCategory: ItemCategory[];
  SelectedCatagory: string;
  catagoryName: any[] = [];
  listofItems: Items[];
  constructor(private fb: FormBuilder, private modalController: ModalController,
    private ItemCategoryService: ItemCategoryService, private itemsService: ItemsService,
    private shardService: SharedService) { }

  ngOnInit() {
    this.regform1 = this.fb.group({
      type: [''],
      CatagoryId: ['']
    })
    this.getAllItemCategory();
  }
  async getAllItemCategory() {
    this.ItemCategoryService.getAllItemCategories().subscribe(async result => {
      this.ListOfItemCategory = await result;
    });
  }
  apply() {
    this.itemsService.getAllItem().subscribe(async result => {
      this.listofItems = await result;
      let type = this.regform1.get("type").value;
      let category = this.regform1.get("CatagoryId").value;
      if (type != "" && category != "") {
        this.listofItems = this.listofItems.filter(c => c.type == type);
        this.listofItems = this.listofItems.filter(c => c.catagoryId == +category);
        this.shardService.listOfItemsFromFilter.next(this.listofItems);
      }
      else if (type != "") {
        this.listofItems = this.listofItems.filter(c => c.type == type);
        this.shardService.listOfItemsFromFilter.next(this.listofItems);
      }
      else {
        this.listofItems = this.listofItems.filter(c => c.catagoryId == +category);
        this.shardService.listOfItemsFromFilter.next(this.listofItems);
      }
    });
    this.modalController.dismiss();
  }
  reset() {
    this.regform1.reset();
  }
}
