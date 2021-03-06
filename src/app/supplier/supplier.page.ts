import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertController, Platform, IonItemSliding, IonContent } from '@ionic/angular';
import { Supplier } from 'src/Tabels/tabels-list';
import { SupplierService } from '../Service/supplier.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.page.html',
  styleUrls: ['./supplier.page.scss'],
})
export class SupplierPage implements OnInit {
  regform = this.fb.group({});
  usePicker: boolean;
  supplierId: number;
  ListOfSupplier: Supplier[];
  filteredSupplier: Supplier[];
  showScroll: boolean = false
  @ViewChild('pageTop') pageTop: IonContent
  public pageScroller() {
    this.pageTop.scrollToTop();
  }
  constructor(private fb: FormBuilder, private supplierService: SupplierService, private platform: Platform,
    private alertController: AlertController) { }

  ngOnInit() {
    this.regform = this.fb.group({
      balance: ['', Validators.required],
      location: ['', Validators.required],
      country: ['', Validators.required],
      agreement: ['', Validators.required],
      commission: ['', Validators.required],
    });
    this.getSupplier();
    if ((this.platform.is('mobile') && !this.platform.is('hybrid')) ||
      this.platform.is('desktop')
    ) {
      this.usePicker = true;
    }
  }
  scroll(ev) {
    const offset = ev.detail.scrollTop;
    this.showScroll = offset > 300;
  }
  getSupplier() {
    try {
      this.supplierService.getAllSupplier().subscribe(result => {
        if (result.length > 0) {
          this.ListOfSupplier = result;
          this.filteredSupplier = result;
        }
        else {
          this.AlertInternet();
        }
      }
      );
    }
    catch (error) {
      console.log(error);
    }

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
  SaveSupplier() {
    if (this.regform.valid) {
      if (!this.supplierId) {
        this.supplierService.create(this.regform.value);
      }
      else {
        let data = {
          id: this.supplierId,
          balance: this.regform.get('balance').value,
          location: this.regform.get('location').value,
          country: this.regform.get('country').value,
          agreement: this.regform.get('agreement').value,
          commission: this.regform.get('commission').value,
        }
        this.supplierService.updateSupplier(data)
      }
      this.regform.reset();
      this.supplierId = 0;
      this.presentAlert("Save Sucessfully");
    }
    else {
      this.presentAlert("plase enter all fileds");
    }
  }
  async presentAlert(message) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Suppliers',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
  filter(query) {

    this.filteredSupplier = (query.target.value) ? this.ListOfSupplier.filter(p => p.balance.toLowerCase().includes(query.target.value.toLowerCase())) :
      this.ListOfSupplier;
  }
  Edit(item: Supplier, slidingItem: IonItemSliding) {
    this.supplierId = item.id;
    this.regform.get('balance').setValue(item.balance);
    this.regform.get('agreement').setValue(item.agreement);
    this.regform.get('commission').setValue(item.commission);
    this.regform.get('country').setValue(item.country);
    this.regform.get('location').setValue(item.location);
    slidingItem.close();
  }
  delete(item: Supplier, slidingItem: IonItemSliding) {
    this.presentAlertConfirm(item)
  }
  async presentAlertConfirm(item: Supplier) {
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
            this.supplierService.removeSupplier(item.id);
            this.regform.reset();
            this.supplierId = null;
          }
        }
      ]
    });

    await alert.present();
  }
}
