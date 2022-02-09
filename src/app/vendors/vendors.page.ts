import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertController, IonContent, IonItemSliding, ModalController, Platform } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Vendors } from 'src/Tabels/tabels-list';
import { SharedService } from '../Service/shared.service';
import { VendorsService } from '../Service/vendors.service';
import { FilterPage } from './filter/filter.page';
import { SortPage } from './sort/sort.page';
import { VendorModalPage } from './vendor-modal/vendor-modal.page';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.page.html',
  styleUrls: ['./vendors.page.scss'],
})
export class VendorsPage implements OnInit {
  regform = this.fb.group({});
  usePicker: boolean;
  listOfvendors$: Observable<Vendors[]>
  listOfvendors: Vendors[];
  filteredVendors: Vendors[];
  vendorId: string;
  VocherNo: string = '0';
  searchText: string;
  //paging declaration
  page = 1;
  count = 0;
  tableSize = 5;
  currentIndex = -1;
  editMode: boolean = false;
  lengthOfVendor: number;
  listOfVendor: Vendors[];
  public segment: string = "list";
  sortN: number = 0;
  events: Array<string> = [];
  vendorName: any;
  address: any;
  balance: any;
  contact: any;
  email: any;
  phonenumber: any;
  website: any;
  allowSearch: boolean;
  showScroll: boolean = false;
  @ViewChild('pageTop') pageTop: IonContent
  public pageScroller() {
    this.pageTop.scrollToTop()
  }
  constructor(private fb: FormBuilder, private platform: Platform,
    private vendorService: VendorsService, private alertController: AlertController,
    private modalController: ModalController, private shardService: SharedService
  ) {
  }
  ngOnInit() {
    this.regform = this.fb.group({
      vendorName: ['', Validators.required],
      phonenumber: ['', Validators.compose([Validators.pattern("[0-9]*")])],
      contact: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.email],
      website: [''],
      balance: ['', Validators.compose([Validators.required, Validators.pattern("[0-9]*")])]
    });
    this.getVendor();
    this.readVoucherId();
    this.getListOfVendorFromSorting();
    this.getListOfVendorFromFilter();
    if ((this.platform.is('mobile') && !this.platform.is('hybrid')) ||
      this.platform.is('desktop')
    ) {
      this.usePicker = true;
    }
  }
  openModal() {
    this.modalController.create({
      component: VendorModalPage,
      cssClass: 'my-custom'
    }).then((modelElement) => {
      modelElement.present();
    })
  }
  scroll(ev) {
    const offset = ev.detail.scrollTop;
    this.showScroll = offset > 300;
}
 async readVoucherId() {
    let No = 0;
    this.vendorService.getAllVendor().subscribe(async result => {
      if (await result.length == 0)
        No = 1;
      else
        No = await result.length + 1;
      this.VocherNo = "VN-" + this.VocherNo.padStart(4, '0') + No;
    })
  }
 async getListOfVendorFromFilter() {
    this.shardService.listOfVendorFromFilter.subscribe(async res => {
      this.listOfvendors = await res;
      this.sortN = 2;
      this.allowSearch = true
    })
  }
  doRefresh(ev) {
    setTimeout(() => {
      this.getVendor();
      ev.target.complete();
    }, 2000);
  }
 async getListOfVendorFromSorting() {
    this.shardService.listOfVendorFromSorting.subscribe(async res => {
      this.listOfvendors = await res;
      this.sortN = 1;
      this.allowSearch = true
    })
  }
 async getVendor() {
    try {
      this.vendorService.getAllVendor().subscribe(async result => {
        this.lengthOfVendor = await result.length;
        this.allowSearch = true
        if (result.length > 0) {
          this.listOfvendors = await result;
          this.filteredVendors = await result;
        }
        else {
          this.AlertInternet();
        }
      });
    }
    catch (error) {
      console.log(error);
    }
  }
  async AlertInternet() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Internet',
      message: 'Please trun on data or wifi',
      buttons: ['ok']
    });
    await alert.present();
  }
  SaveVender() {
    if (this.regform.valid) {
      if (!this.vendorId) {
        this.vendorService.create(this.regform.value).subscribe(async res => {
          console.log(res.toString())
          await this.getVendor();
        });
      }
      else {
        let data = {
          id: this.vendorId,
          address: this.regform.get('address').value,
          balance: this.regform.get('balance').value,
          contact: this.regform.get('contact').value,
          email: this.regform.get('email').value,
          phonenumber: this.regform.get('phonenumber').value,
          vendorName: this.regform.get('vendorName').value,
          website: this.regform.get('website').value
        }
        this.vendorService.updateVendor(data).subscribe(async res => {
          console.log(res.toString())
          await this.getVendor();
        });
      }
      this.regform.reset();
      this.vendorId = "";
      this.presentAlert("Add Vendor Sucessfully");
    }
    else {
      this.presentAlert("Please enter all fields");
    }
  }
  async presentAlert(message) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Vendors',
      message: message,
      buttons: ['ok']
    });
    await alert.present();
  }
  filter(query) {
    this.filteredVendors = (query.target.value) ?
      this.listOfvendors.filter(p => p.vendorName.toLowerCase().includes(query.target.value.toLowerCase())) :
      this.listOfvendors;
  }
  async update(item: Vendors) {
    const modal = await this.modalController.create({
      component: VendorModalPage,
      cssClass: 'my-custom',
      componentProps: {
        data: item
      }
    });
    return await modal.present().then(_ => {
      // triggered when opening the modal
      //console.log('Sending: ',item);
    });
  }
  segmentChanged(ev: any) {
    this.segment = ev.detail.value;
  }
  delete(item: Vendors) {
    this.presentAlertConfirm(item);
  }
  async presentAlertConfirm(item: Vendors) {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: '<strong>Are you sure you want delete?</strong>',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'OK',
          handler: () => {
            this.vendorService.removeVendor(item.id).subscribe(async () => {
              console.log("delete success");
              await this.getVendor();
            });
            this.regform.reset();
            this.vendorId = null;
          }
        }
      ]
    });

    await alert.present();
  }
  //paging function
  async onTableDataChange(event) {
    this.page = event;
    if (this.sortN == 1) {
      await this.getListOfVendorFromSorting();
    }
    else if (this.sortN == 2) {
      await this.getListOfVendorFromFilter();
    }
    else {
      await this.getVendor();
    }
  }
  fliter() {
    this.modalController.create({
      component: FilterPage,
      cssClass: 'filterItems'
    }).then((modelElement) => {
      modelElement.present();
    })
  }
  sort() {
    this.modalController.create({
      component: SortPage,
      cssClass: 'sortItem'
    }).then((modelElement) => {
      modelElement.present();
    })
  }
  updateRow(event) {
    let id = event.key;
    let newData = event.newData;
    let oldData = event.oldData;
    if (newData != null) {
      if (newData.vendorName != null) {
        this.vendorName = newData.vendorName
      }
      if (newData.vendorName == null) {
        this.vendorName = oldData.vendorName
      }
      if (newData.address != null) {
        this.address = newData.address
      }
      if (newData.address == null) {
        this.address = oldData.address
      }
      if (newData.balance != null) {
        this.balance = newData.balance
      }
      if (newData.balance == null) {
        this.balance = oldData.balance
      }
      if (newData.contact != null) {
        this.contact = newData.contact
      }
      if (newData.contact == null) {
        this.contact = oldData.contact
      }
      if (newData.email != null) {
        this.email = newData.email
      }
      if (newData.email == null) {
        this.email = oldData.email
      }
      if (newData.phonenumber != null) {
        this.phonenumber = newData.phonenumber
      }
      if (newData.phonenumber == null) {
        this.phonenumber = oldData.phonenumber
      }
      if (newData.website != null) {
        this.website = newData.website
      }
      if (newData.website == null) {
        this.website = oldData.website
      }
    }
    let data = {
      id: id,
      address: this.address,
      balance: this.balance,
      contact: this.contact,
      email: this.email,
      phonenumber: this.phonenumber,
      vendorName: this.vendorName,
      website: this.website
    }
    this.vendorService.updateVendor(data).subscribe(async res => {
      console.log(res.toString())
      await this.getVendor();
    }, async (err) => {
      console.log(err);
    });
  }
  deleteRow(event) {
    let id = event.key;
    this.vendorService.removeVendor(id).subscribe(async res => {
      console.log(res.toString())
      await this.getVendor();
    }, async (err) => {
      console.log(err);
    });
  }

}
