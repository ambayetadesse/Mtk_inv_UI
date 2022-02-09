import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertController, IonContent, } from '@ionic/angular';
import { Customer, ItemStoreBalance, Vocher } from 'src/Tabels/tabels-list';
import { CustomerService } from '../Service/customer.service';
import { VocherService } from '../Service/vocher.service';
@Component({
  selector: 'app-recieve-payment',
  templateUrl: './recieve-payment.page.html',
  styleUrls: ['./recieve-payment.page.scss'],
})
export class RecievePaymentPage implements OnInit {
  regform = this.fb.group({});
  listOfCustomer: Customer[];
  defaultSelectedCurrency: number;
  filterCustomer: Customer[];
  selectedCustomerBalance: number;
  updateBalance: number;
  recieveBalanceId: string;
  listOfBalance: ItemStoreBalance[];
  id: any;
  Balance: number;
  listOfVoucher: Vocher[];
  customerId: number;
  totalBalance: number;
  balance: number;
  payment: number = 0;
  checkedItems: any[] = [];
  balanceValue: number;
  PaidBalance: number;
  remaining: number;
  btnDisabled: boolean;
  selectAllModeVlaue: string = "page";
  selectionModeValue: string = "all";
  arr_names: string[] = new Array();
  allMode: string;
  checkBoxesMode: string;
  selectedRows: string[];
  selectionChangedBySelectbox: boolean;
  selectedRowKeys: any;
  selectedItemKeys: any[] = [];
  showScroll: boolean = false
  @ViewChild('pageTop') pageTop: IonContent
  loader: any;
  public pageScroller() {
    this.pageTop.scrollToTop();
  }
  constructor(private fb: FormBuilder,
    private customerService: CustomerService,
    private alertController: AlertController,
    private voucherService: VocherService) {
    this.allMode = 'allPages';
    this.checkBoxesMode = 'onClick'
  }
 async ngOnInit() {
    this.regform = this.fb.group({
      customer: ["", Validators.required],
      payment: ["", Validators.required],
      updateBalance: 0
    })
    this.getAllCustomerList();
  }
  public fields: Object = { text: "phonenumber", value: "fullname" };
  public watermark2: string = "Select Customer";
  public height: string = "250px";
  onChange(item) {
    if (this.checkedItems.includes(item)) {
      this.checkedItems = this.checkedItems.filter((value) => value != item);
    }
    else {
      this.checkedItems.push(item)
    }
    this.payment = 0;
    this.PaidBalance = 0;
    this.checkedItems.forEach(list => {
      this.payment = +this.payment + list.subTotal;
      this.PaidBalance = this.payment;
      this.remaining = this.totalBalance - this.PaidBalance;
    })
  }
  scroll(ev) {
    const offset = ev.detail.scrollTop;
    this.showScroll = offset > 300;
  }
  getDisplayExpr(item) {
    if (!item) {
      return "";
    }
    return item.fullname + " " + item.phonenumber;
  }
  async getAllCustomerList() {
    this.customerService.getAllCustomer().subscribe(async res => {
      if (await res.length > 0) {
        this.listOfCustomer = await res;
        this.defaultSelectedCurrency = this.listOfCustomer[0].id;
        this.customerId = this.defaultSelectedCurrency;
        if (this.customerId !== null) {
          this.voucherService.getAllVocher().subscribe(async res => {
            this.listOfVoucher = await res.filter(c => c.userId == this.customerId && c.paymentStatus =="Unpaid");
          })
        }
      }
      else {
        this.AlertInternet();
      }
    }, async (err) => {
      await this.loader.dismiss().then();
      console.log(err)
    })
  }
  async getVoucherById(customerId: number) {
    this.totalBalance = 0; this.balance = 0;
    if (this.customerId !== null) {
      this.voucherService.getAllVocher().subscribe(async res => {
        this.listOfVoucher = await res.filter(c => c.userId == customerId && c.paymentStatus == "Unpaid");
        if (this.listOfVoucher.length == 0) {
          this.balance = this.updateBalance;
        }
        else {
          this.listOfVoucher.forEach(element => {
            this.totalBalance = +this.totalBalance + element.subTotal
            this.balance = this.totalBalance + this.updateBalance;
          });
        }
        console.log(res)
      },async(err)=>{
        await this.loader.dismiss().then();
        console.log(err)
      })
    }
  }
  onKey() {
    this.Balance = this.updateBalance + this.totalBalance - this.regform.get("payment").value;
  }
  SelectedValue($event) {
    const newValue = $event.value;
    const previousValue = $event.previousValue;
    this.id = newValue || previousValue;
    this.filterCustomer = this.listOfCustomer.filter(c => c.id == this.id);
    this.selectedCustomerBalance = this.filterCustomer[0].balance;
    this.payment = 0;
    this.checkedItems.splice(0);
    this.updateBalance = this.selectedCustomerBalance;
    this.customerId = this.filterCustomer[0].id;
    this.getVoucherById(this.customerId);
  }

  reCalculateBalance() {
    {
      if (this.regform.valid) {
        if (!this.recieveBalanceId) {
          let updateCustomerData = {
            id: this.defaultSelectedCurrency,
            fullname: this.filterCustomer[0].fullname,
            phonenumber: this.filterCustomer[0].phonenumber,
            location: this.filterCustomer[0].location,
            balance: this.updateBalance - this.payment,
            address: this.filterCustomer[0].address
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
          this.customerService.updateCustomer(updateCustomerData).subscribe(() =>
          console.log('update success')
          )
        }
        this.regform.reset();
        this.recieveBalanceId = "";
        this.presentAlert(" Sucess");
      }
      else {
        this.presentAlert("Please enter all fields");
      }
    }
  }
  async presentAlert(message) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Recive payment',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
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
  async AlertInternet() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Internet',
      message: 'Please turn on wifi or data',
      buttons: ['OK']
    });
    await alert.present();
  }
}
