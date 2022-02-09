import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { DxDataGridComponent } from 'devextreme-angular';
import { exportDataGrid as exportDataGridToPdf, PdfDataGridCell } from 'devextreme/pdf_exporter';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { ItemCategoryService } from 'src/app/Service/item-category.service';
import { ItemsService } from 'src/app/Service/items.service';
import { LookupService } from 'src/app/Service/lookup.service';
import { StoreTransferService } from 'src/app/Service/store-transfer.service';
import { UserService } from 'src/app/Service/User.service';
import { ItemCategory, Items, Lookup, Users } from 'src/Tabels/tabels-list';
@Component({
  selector: 'app-store-transfer-report',
  templateUrl: './store-transfer-report.page.html',
  styleUrls: ['./store-transfer-report.page.scss'],
})
export class StoreTransferReportPage implements OnInit {
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent;
  listOfStoreTransferReport: any[] = [];
  listOfItems: Items[];
  displayItems: Items[] = [];
  listOfUsers: Users[];
  listOfLookup: Lookup[];
  listOfItemCatagory: ItemCategory[];
  loader: HTMLIonLoadingElement;
  constructor(
    private storeTransferService: StoreTransferService,
    private itemService: ItemsService,
    private userService: UserService,
    private lookupService: LookupService,
    private itemCatagoryService: ItemCategoryService,
    private loadingController: LoadingController
  ) { }
  async ngOnInit() {
    const loader = await this.loadingController.create({
      message: 'data loading ...',
      spinner: 'bubbles',
      animated: true,
      duration: 300
    });
    await loader.present().then();
    this.getUser();
    this.getCatagories();
    this.getItem();
    this.getLookup();
    this.getStoreTansfer(); 
    this.getStoreTansfer();
  }
  getItem() {
    this.itemService.getAllItem().subscribe(async items => {
      this.listOfItems = await items;
    });
  }
  getUser() {
    this.userService.getAllUser().subscribe(user => {
      this.listOfUsers = user;
    });
  }
  getLookup() {
    this.lookupService.getAllLookUp().subscribe(stores => {
      this.listOfLookup = stores;
    });
  }
  getCatagories() {
    this.itemCatagoryService.getAllItemCategories().subscribe(res => {
      this.listOfItemCatagory = res;
    })
  }
  async getStoreTansfer() {
    this.storeTransferService.getAllStoreTransfer().subscribe(async result => {
      if (this.listOfItems != undefined) {
        this.listOfStoreTransferReport = [];
        await result.forEach(element => {
          let categoryId = this.listOfItems.find(c => c.id === element.itemId).catagoryId;
          let itemList = {
            AssignTo: this.listOfUsers.find(c => c.id === +element.assignTo).username,
            Transfer_Date: element.date,
            From_Location: this.listOfLookup.find(c => c.id === element.fromStoreId).name,
            item: this.listOfItems.find(c => c.id === element.itemId).name,
            quantity: element.quantity,
            Transfer_No: element.storeTransferId,
            To_Location: this.listOfLookup.find(c => c.id === element.toStoreId).name,
            Cost: this.listOfItems.find(c => c.id === element.itemId).price,
            Catagory: this.listOfItemCatagory.find(c => c.id === categoryId).categoryName
          }
          this.listOfStoreTransferReport.push(itemList);
          //this.listofItems.filter(item => item.CatagoryId == id).map(item => item.id);
        });
      }
      else {
        this.getRefresh()
      }
    });
  }
  getRefresh() {
    setTimeout(() => {
      this.getItem();
      this.getLookup();
      this.getCatagories();
      this.getUser()
      this.getStoreTansfer();
    }, 200);
  }
  onExporting(e) {
    const pdfDoc = new jsPDF('p', 'mm', 'a4');
    exportDataGridToPdf({
      jsPDFDocument: pdfDoc,
      component: this.dataGrid.instance,
      customizeCell: ((options: { gridCell?: PdfDataGridCell, pdfCell?: any }) => {
        if (options.gridCell.column.dataField === 'picture') {
          if (options.gridCell.rowType === 'data') {
            // options.pdfCell.content = '';
            //options.gridCell.value = undefined;
            options.pdfCell = ({ data }) => {
              console.log(data);
              const imageData = options.pdfCell.addImage({
                base64: options.gridCell.value,
                extension: 'JPEG'
              });
              pdfDoc.addImage(imageData, 'JPEG', data.cell.x, data.cell.y, 50, 70);
            };
          }
        }
      })
    }).then(() => {
      pdfDoc.save('filePDF.pdf');
    });

    e.cancel = true;
  }
}
