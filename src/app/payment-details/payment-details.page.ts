import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { DxLookupComponent } from 'devextreme-angular';
import { Customer, Vocher } from 'src/Tabels/tabels-list';
import { CustomerService } from '../Service/customer.service';
import { SharedService } from '../Service/shared.service';
import { VocherService } from '../Service/vocher.service';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.page.html',
  styleUrls: ['./payment-details.page.scss'],
})
export class PaymentDetailsPage implements OnInit {
  @ViewChild("simpleLookup", { static: false }) simpleLookup: DxLookupComponent;
  listOfVoucher: any[] = [];
  payment: number = 0;
  listOfCustomer: Customer[];
  defaultSelectedCurrency: string;
  updateBalancePayment: any;
  paymentValue: any;
  editMode: boolean = false;
  @Input() public balance;
  @Input() public customerId;
  @Input() public vendorId;
  @Input() public grandTotalCustomer;
  @Input() public grandTotalVendor;
  @Input() public date;
  selectedItemKeys: any[] = [];
  balanceV: number;
  constructor(
    private voucherService: VocherService,
    private modalController: ModalController,
    private sharedService: SharedService,
    private fb: FormBuilder, private customerService: CustomerService) { }

  ngOnInit() {

    // console.log(this.balance);
    // console.log(this.customerId);
    // console.log(this.vendorId);
    //console.log(this.grandTotalCustomer);
    //console.log(this.grandTotalVendor);
    this.updateBalancePayment = this.balance;
    this.getAllVoucher();
  }
  getAllVoucher() {
    if (this.vendorId != null || this.balance != null || this.customerId != null) {
      if (this.vendorId != null) {
        this.voucherService.getAllVocher().subscribe(res => {
          res.filter(c => c.vendorId == this.vendorId).forEach(el => {
            let data = {
              Date: el.date,
              Type: "Payment",
            }
            this.listOfVoucher.push(data);
          })
          //console.log(res)
        })
      }
      else {
        this.voucherService.getAllVocher().subscribe(res => {
          res.filter(c => c.userId == this.customerId).forEach(el => {
            let data = {
              Date: el.date,
              Type: "Payment",
            }
            this.listOfVoucher.push(data);
          })
        })
      }
    }
  }

  close() {
    this.modalController.dismiss();
  }
  PayBalance() {
    let data = {
      Date: this.date,
      Type: "Payment",
      Amount: this.balance
    }
    this.listOfVoucher.push(data)
    this.paymentPaid(this.balance);
  }
  IssueRund() {
    this.editMode = true;
    let data = {
      Date: this.date,
      Type: "Payment",
      Amount: -(this.balance)
    }
    this.listOfVoucher.push(data)
    this.paymentPaid(0);
  }
  submitPayment() {
    let payment = {
      updateBalance: this.updateBalancePayment,
      paymnetBalance: this.payment
    }
    this.sharedService.balance.next(payment);
    this.modalController.dismiss();
  }
  selectionChangedRow(data: any) {
    this.selectedItemKeys = data.selectedRowKeys;
  }
  paymentPaid(data: any) {
    this.balanceV = data;
    if ((typeof (this.balanceV)) === 'number') {
      this.payment = data
    } else {
      this.payment = this.payment + parseFloat(data.newData.Amount);
      this.updateBalancePayment = this.balance - this.payment;
    }
  }

}
