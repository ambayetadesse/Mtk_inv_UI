import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { VendorsService } from 'src/app/Service/vendors.service';

@Component({
  selector: 'app-vendor-modal',
  templateUrl: './vendor-modal.page.html',
  styleUrls: ['./vendor-modal.page.scss'],
})
export class VendorModalPage implements OnInit {
  regform = this.fb.group({})
  vendorId: any;
  @Input() public data;
  itemList: any;
  editMode: boolean = false;
  loader: any;
  constructor(private fb: FormBuilder, private vendorService: VendorsService,
    private alertController: AlertController,
    private modalController: ModalController) { }
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
    if (this.data == null) {
      this.itemList = null
    } else {
      this.editMode = true;
      this.itemList = Object.assign(this.data);
      this.vendorId = this.itemList.id;
      this.regform.get("vendorName").setValue(this.itemList.vendorName);
      this.regform.get("phonenumber").setValue(this.itemList.phonenumber);
      this.regform.get("contact").setValue(this.itemList.contact);
      this.regform.get("address").setValue(this.itemList.address);
      this.regform.get("email").setValue(this.itemList.email);
      this.regform.get("website").setValue(this.itemList.website);
      this.regform.get("balance").setValue(this.itemList.balance);
    }
  }
  SaveVender() {
    if (this.regform.valid) {
      if (!this.vendorId) {
        this.vendorService.create(this.regform.value).subscribe(async res => {
          console.log(res.toString());
          this.presentAlert("Add Vendor Sucessfully");
        }, async (err) => {
          console.log(err);
        });
        this.modalController.dismiss();
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
        this.vendorService.updateVendor(data).subscribe(res => {
          console.log(res.toString())
        }, async (err) => {
          await this.loader.dismiss().then();
          console.log(err);
        });
        this.presentAlert("Update Vendor Sucessfully");
        this.modalController.dismiss();
      }
      this.regform.reset();
      this.vendorId = "";

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
  closeModal() {
    this.modalController.dismiss();
  }
}
