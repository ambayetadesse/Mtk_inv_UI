import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertController, IonContent } from '@ionic/angular';
import { Vendors } from 'src/Tabels/tabels-list';
import { AppError } from '../common/app-error';
import { BadInput } from '../common/bad-input';
import { VendorsService } from '../Service/vendors.service';
import { VocherService } from '../Service/vocher.service';

@Component({
  selector: 'app-pay-supplier',
  templateUrl: './pay-supplier.page.html',
  styleUrls: ['./pay-supplier.page.scss'],
})
export class PaySupplierPage implements OnInit {
  regform = this.fb.group({});
  defaultSelectedCurrency: number;
  selectedVendorBalance: any;
  updateBalance: number;
  recieveBalanceId: string;
  listOfVonder: Vendors[];
  filterVendor: Vendors[];
  listOfVoucher: any;
  listOfVoucherVendor: any;
  totalBalance: number;
  remainderBalance: number;
  id: any;
  payment: number
  Balance: number;
  balance: number;
  checkedItems = [];
  currentDate = new Date().toISOString();
  selectedDate = new Date().toISOString();
  minDate = new Date().toISOString();
  maxDate = new Date().toISOString();
  allMode: string;
  checkBoxesMode: string;
  selectedRows: any[] = [];
  PaidBalance: number;
  remaining: number;
  selectedItemKeys: any[] = [];
  showScroll: boolean = false;
  @ViewChild('pageTop') pageTop: IonContent
  public pageScroller() {
    this.pageTop.scrollToTop();
  }
  constructor(private fb: FormBuilder,
    private vonderService: VendorsService,
    private alertController: AlertController, private voucherService: VocherService) {
    //setting min date
    let date: Date = new Date();
    date.setDate(date.getDate() - 5);
    this.minDate = date.toISOString();
    //setting max date
    date = new Date();
    date.setDate(date.getDate() + 5);
    this.maxDate = date.toISOString();
    this.allMode = 'allPages';
    this.checkBoxesMode = 'onClick'
  }

  ngOnInit() {
    this.regform = this.fb.group({
      vendor: ["", Validators.required],
      payment: ["", Validators.required],
      date: ["", Validators.required],
      updateBalance: 0
    })
    this.getAllCustomerList();
  }
  public fields: Object = { text: "vendorName", value: "vendorName" };
  public watermark2: string = "Select Vendor";
  public height: string = "250px";

  getDisplayExpr(item) {
    if (!item) {
      return "";
    }
    return item.vendorName + " " + item.phonenumber;
  }
 async getAllCustomerList() {
    this.vonderService.getAllVendor().subscribe(async res => {
      if (await res.length > 0) {
        this.listOfVonder = await res;
        this.defaultSelectedCurrency = this.listOfVonder[0].id;
        this.voucherService.getAllVocher().subscribe(async res => {
          this.listOfVoucher = await res.filter(c => c.vendorId == this.defaultSelectedCurrency && c.paymentStatus == "Unpaid");
        })
      }
      else {
        this.AlertInternet();
      }
    })
  }
  onChange(item) {
    if (this.checkedItems.includes(item)) {
      this.checkedItems = this.checkedItems.filter((value) => value != item);
    }
    else {
      this.checkedItems.push(item)
    }
    this.payment = 0;
    this.checkedItems.forEach(list => {
      this.payment = +this.payment + list.subTotal;
    })
  }
  selectionChangedHandler(event) {
    this.checkedItems = [];
    let addedItems = event.selectedRowsData;
    if (this.checkedItems.includes(addedItems)) {
      this.checkedItems = this.checkedItems.filter((value) => value != addedItems);
    }
    else {
      this.checkedItems.push(addedItems)
      this.selectedRows.push(event.selectedRowKeys);
    }
    this.payment = 0;
    this.PaidBalance = 0;
    this.checkedItems.forEach(list => {
      list.forEach(element => {
        this.payment = +this.payment + element.subTotal;
        this.PaidBalance = this.payment;
        this.remaining = this.totalBalance - this.PaidBalance;
      });
    });
  }
  payAllBalance() {
    this.listOfVoucher.forEach(listOfData => {
      this.payment = +this.payment + listOfData.subTotal;
      this.PaidBalance = this.payment;
      this.remaining = this.totalBalance - this.PaidBalance;
    })
  }
  selectionChangedRow(data: any) {
    this.selectedItemKeys = data.selectedRowKeys;
  }
  onKey() {
    this.Balance = this.updateBalance + this.totalBalance - this.regform.get("payment").value;
  }
  SelectedValue($event) {
    const newValue = $event.value;
    const previousValue = $event.previousValue;
    this.id = newValue || previousValue;
    this.filterVendor = this.listOfVonder.filter((c) => c.id == this.id);
    this.selectedVendorBalance = this.filterVendor[0].balance;
    this.checkedItems.splice(0);
    this.payment = 0;
    this.remaining = 0;
    this.updateBalance = this.selectedVendorBalance;
    this.getVoucherByVendorId(this.defaultSelectedCurrency);
  }
  getVoucherByVendorId(defaultSelectedCurrency: number) {
    this.totalBalance = 0; this.balance = 0;
    this.listOfVoucherVendor = this.voucherService.getAllVocher().subscribe(res => {
      this.listOfVoucher = res.filter(c => c.vendorId == defaultSelectedCurrency && c.paymentStatus == "Unpaid");
      if (res != undefined) {
        this.balance = this.updateBalance;
      }
      else {
        this.listOfVoucher.forEach(element => {
          this.totalBalance = +this.totalBalance + element.subTotal
          this.balance = this.totalBalance + this.updateBalance;
        });
      }
    })
  }
  reCalculateBalance() {
    {
      if (this.regform.valid) {
        if (!this.recieveBalanceId) {
          let updateVendorData = {
            vendorName: this.filterVendor[0].vendorName,
            email: this.filterVendor[0].email,
            phonenumber: this.filterVendor[0].phonenumber,
            contact: this.filterVendor[0].contact,
            balance: (this.updateBalance - this.payment).toString(),
            address: this.filterVendor[0].address,
            website: this.filterVendor[0].website
          }
          this.checkedItems.forEach(list => {
            list.forEach(element => {
              let voucherList = {
                id: element.id,
                vocherId: element.vocherId,
                subTotal: element.subTotal,
                taxAmount: element.taxAmount,
                grandTotal: element.grandTotal,
                date: element.date,
                vocherTypeId: element.vocherTypeId,
                vendor: element.vendor,
                userId: element.userId,
                PaymentStatus: 'paid'
              }
              this.voucherService.updateVocher(voucherList).subscribe(() => {
                console.log("update success")
                this.getAllCustomerList()
              })
            });
          })
          this.vonderService.updateVendor(updateVendorData).subscribe(() =>
            console.log("Update success")
          );
        }
        // else{
        //  this.idSettingService.updateIdSetting(this.regform.value,this.IdSettingId)
        // }
        this.regform.reset();
        this.recieveBalanceId = "";
        this.presentAlert(" Sucess");
      }
      else {
        this.presentAlert("Please enter all fields");
      }
    }
  }
  scroll(ev) {
    const offset = ev.detail.scrollTop;
    this.showScroll = offset > 300;
}
  async presentAlert(message) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'pay Supplier',
      // subHeader: 'Subtitle',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
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
