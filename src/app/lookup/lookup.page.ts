import { LookupCatagoryService } from './../Service/lookup-catagory.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertController, IonItemSliding } from '@ionic/angular';
import { ItemCategory, Lookup, LookupCatagory } from 'src/Tabels/tabels-list';
import { CatagoryService } from '../Service/catagory.service';
import { LookupService } from '../Service/lookup.service';

@Component({
  selector: 'app-lookup',
  templateUrl: './lookup.page.html',
  styleUrls: ['./lookup.page.scss'],
})
export class LookupPage implements OnInit {
  listofItemcatagory: ItemCategory[];
  regform = this.fb.group({});
  lookupId: number;
  listOflookUp: Lookup[];
  filteredLookUp: Lookup[];

  editMode: boolean = false;
  listOfLookupCatagory: LookupCatagory[];
  SelectedLookup: number;
  constructor(private fb: FormBuilder, private lookupService: LookupService,
    private alertController: AlertController, private lookupCatagoryService: LookupCatagoryService) { }

  ngOnInit() {
    this.regform = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      value: [''],
      remark: ['']
    });
    this.allLookupCatagory();
    this.readLookup();
  }

  readLookup() {
    this.lookupService.getAllLookUp().subscribe(res => {
      this.listOflookUp = res;
    })
  }
  SelectedValue($event) {
    this.lookupService.getAllLookUp().subscribe(res => {
      this.listOflookUp = res;
      this.filteredLookUp = this.listOflookUp.filter(c => c.type == $event.target.value);
    })
  }
  filter(query) {
    this.filteredLookUp = (query.target.value) ? this.listOflookUp.filter(p => p.name.toLowerCase().includes(query.target.value.toLowerCase())) :
      this.listOflookUp;
  }
  allLookupCatagory() {
    this.lookupCatagoryService.getAllLookupCatagory().subscribe(result => {
      if (result.length > 0) {
        this.listOfLookupCatagory = result;
        this.SelectedLookup = this.listOfLookupCatagory[0].id;
      }
      else {
        this.AlertInternet();
      }
    })
  }
  Save() {
    if (this.regform.valid) {
      if (!this.lookupId) {
        console.log(this.regform.value)
        this.lookupService.create(this.regform.value).subscribe(res => {
          console.log(res.toString())
          this.readLookup();
        });
      }
      else {
        let data = {
          id: this.lookupId,
          name: this.regform.get('name').value,
          type: this.regform.get('type').value,
          value: this.regform.get('value').value,
          remark: this.regform.get('remark').value
        }
        this.lookupService.updateLookup(data).subscribe(res => {
          console.log(res.toString())
          this.readLookup();
        })
      }
      this.regform.reset();
      this.lookupId = 0;
      this.presentAlert("Save Sucessfully");
    }
    else {
      this.presentAlert("plase enter all fields");
    }
  }
  async presentAlert(message) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'lookup',
      // subHeader: 'Subtitle',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
  Edit(item: Lookup, slidingItem: IonItemSliding) {
    this.editMode = true;
    this.lookupId = item.id;
    this.regform.get("name").setValue(item.name);
    this.regform.get("type").setValue(item.type);
    this.regform.get("value").setValue(item.value);
    this.regform.get("remark").setValue(item.remark);
    slidingItem.close();
  }
  delete(item: Lookup, slidingItem: IonItemSliding) {
    this.presentAlertConfirm(item)
  }
  async presentAlertConfirm(item: Lookup) {
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
            this.lookupService.removeLookup(item.id).subscribe(res => {
              console.log(res)
              this.readLookup();
            });
            this.regform.reset();
            this.lookupId = null;
          }
        }
      ]
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
