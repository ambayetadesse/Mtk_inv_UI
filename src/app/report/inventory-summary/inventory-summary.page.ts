import { Component, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { exportDataGrid as exportDataGridToPdf, PdfDataGridCell } from 'devextreme/pdf_exporter';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { ItemCategoryService } from 'src/app/Service/item-category.service';
import { ItemsService } from 'src/app/Service/items.service';
import { LineItemsService } from 'src/app/Service/line-items.service';
import { ItemCategory, Items } from 'src/Tabels/tabels-list';
import { exportDataGrid } from 'devextreme/excel_exporter';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { AlertController, LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-inventory-summary',
  templateUrl: './inventory-summary.page.html',
  styleUrls: ['./inventory-summary.page.scss'],
})
export class InventorySummaryPage implements OnInit {
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent;
  ListOfItem: any[];
  listOfItemCatagory: ItemCategory[];
  InventorySummary: any[] = [];
  listOfLineItemV: any[] = [];
  listOfLineItemC: any[] = [];
  orderQty: any;
  reservedQty: any;
  loader: HTMLIonLoadingElement;
  allowSearch: boolean;
  constructor(private itemsService: ItemsService,
    private itemCatagoryService: ItemCategoryService,
    private lineItemService: LineItemsService,
    private alertController: AlertController,
    private loadingController: LoadingController) { }

  async ngOnInit() {
    this.loader = await this.loadingController.create({
      message: 'Data loading ...',
      spinner: 'bubbles',
      animated: true
    });
    await this.loader.present().then();
    //this.getCatagories();
    this.getItem();
    this.getLineItem();
  }

  getLineItem() {
    this.lineItemService.getAllLineItem().subscribe(async lineItemLists => {
      await this.loader.dismiss().then();
     await lineItemLists.forEach(ele => {
        let voucherTypeId = ele.vocherId
        let vocherTypeId = voucherTypeId.substring(0, 2);
        if (vocherTypeId == "GR" || vocherTypeId == "PO") {
          let data = {
            ItemID: ele.itemId,
            Quantity: ele.quantity
          }
          this.listOfLineItemV.push(data);
          //console.log(this.listOfLineItemV)
        }
        else if (vocherTypeId == "SO" || vocherTypeId == "CS") {
          let data1 = {
            ItemID: ele.itemId,
            Quantity: ele.quantity
          }
          this.listOfLineItemC.push(data1);
          //console.log(this.listOfLineItemC)
        }
      });
    }, async (err) => {
      await this.loader.dismiss().then();
      console.log(err);
    })
  }
  getCatagories() {
    this.itemCatagoryService.getAllItemCategories().subscribe(async res => {
      await this.loader.dismiss().then();
      this.listOfItemCatagory = await res;
    }, async (err) => {
      await this.loader.dismiss().then();
      console.log(err);
    });
  }
  getItem() {
    this.allowSearch = true;
    this.itemsService.getAllItem().subscribe(async result => {
      await this.loader.dismiss().then();
      if (await result.length > 0) {
        this.ListOfItem = await result;
        this.itemCatagoryService.getAllItemCategories().subscribe(async res => {
          await this.loader.dismiss().then();
          this.listOfItemCatagory = await res;
          this.ListOfItem.forEach(element => {
            this.orderQty = 0;
            this.reservedQty = 0;
            let QtyOrder = this.listOfLineItemV.filter(c => c.ItemID == element.id);
            QtyOrder.forEach(element => {
              this.orderQty = this.orderQty + element.Quantity;
            });
            let QtyReserved = this.listOfLineItemC.filter(c => c.ItemID == element.id);
            QtyReserved.forEach(element => {
              this.reservedQty = this.reservedQty + element.Quantity;
            });
            let itemList = {
              name: element.name,
              catagory: this.listOfItemCatagory.find(c => c.id == element.catagoryId).categoryName,
              quantity: element.quantity,
              picture: element.picture,
              price: element.price,
              Qty_Reserved: this.reservedQty,
              Qty_On_Order: this.orderQty,
              Qty_Available: element.quantity - this.orderQty,
              Total_Cost_Value: element.quantity * element.price,
            }
            this.InventorySummary.push(itemList);
             console.log(this.InventorySummary)
          });
        }, async (err) => {
          await this.loader.dismiss().then();
          console.log(err);
        });
      }
      else {
        this.AlertInternet();
      }
    }, async (err) => {
      await this.loader.dismiss().then();
      console.log(err);
    });
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
  async AlertInternet() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Internet',
      // subHeader: 'Subtitle',
      message: 'Please turn on wifi or data',
      buttons: ['OK']
    });

    await alert.present();
  }
}
