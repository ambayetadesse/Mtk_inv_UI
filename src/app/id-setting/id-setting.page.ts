import { LookupService } from './../Service/lookup.service';
import { IdSetting, Lookup } from './../../Tabels/tabels-list';
import { IdSettingService } from '../Service/id-setting.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertController, IonContent, IonItemSliding } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-id-setting',
  templateUrl: './id-setting.page.html',
  styleUrls: ['./id-setting.page.scss'],
})
export class IdSettingPage implements OnInit {
  regform: any;
  IdSettingId: number;
  editMode: boolean = false;
  vouchertype: Lookup[];
  idSettingList: IdSetting[];
  idSettingList$: Observable<IdSetting[]>
  searchText: string;
  //paging declaration
  page = 1;
  count = 0;
  tableSize = 3;
  tableSizes = [3, 6, 9, 12];
  currentIndex = -1;
  listOfIdSetting: IdSetting[];
  lengthOfIdSetting: number;
  showScroll: boolean = false;
  @ViewChild('pageTop') pageTop: IonContent
  public pageScroller() {
    this.pageTop.scrollToTop();
  }
  constructor(private fb: FormBuilder, private idSettingService: IdSettingService,
    private lookupService: LookupService,
    private alertController: AlertController) { }
  ngOnInit() {
    this.regform = this.fb.group({
      voucherTypeId: ['', Validators.required],
      prefix: ['', Validators.required],
      length: [''],
      suffix: [''],
      currentId: ['']
    });
    this.lookupService.getAllLookUp().subscribe(result => {
      this.vouchertype = result.filter(c => c.type == 1);
      //  console.log(this.vouchertype)
    });
    this.allIdSetting();
  }
  scroll(ev) {
    const offset = ev.detail.scrollTop;
    this.showScroll = offset > 300;
  }
 async allIdSetting() {
    this.idSettingService.getAllIdSetting().subscribe(async result => {
      this.idSettingList = await result;
      this.lengthOfIdSetting = this.idSettingList.length;
      // console.log(this.lengthOfIdSetting);
    });
  }

  Save() {
    if (this.regform.valid) {
      if (!this.IdSettingId) {
        this.idSettingService.create(this.regform.value).subscribe(res => {
         console.log(res.toString());
          this.allIdSetting();
        });
      }
      else {
        let data = {
          id: this.IdSettingId,
          voucherTypeId: this.regform.get('voucherTypeId').value,
          prefix: this.regform.get('prefix').value,
          length: this.regform.get('length').value,
          suffix: this.regform.get('suffix').value,
          currentId: this.regform.get('currentId').value
        }
        this.idSettingService.updateIdSetting(data).subscribe(res => {
         console.log(res.toString());
          this.allIdSetting();
        })
      }
      this.regform.reset();
      this.IdSettingId = 0;
      this.presentAlert("Save Sucessfully");
    }
    else {
      this.presentAlert("Please enter all fields");
    }
  }
  async presentAlert(message) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Id Setting',
      // subHeader: 'Subtitle',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
  Edit(item: IdSetting) {
    this.editMode = true;
    this.IdSettingId = item.id;
    this.regform.get("voucherTypeId").setValue(item.voucherTypeId);
    this.regform.get("length").setValue(item.length);
    this.regform.get("prefix").setValue(item.prefix);
    this.regform.get("suffix").setValue(item.suffix);
    this.regform.get("currentId").setValue(item.currentId);
    //slidingItem.close();
  }
  delete(item: IdSetting) {
    this.presentAlertConfirm(item)
  }
  async presentAlertConfirm(item: IdSetting) {
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
            this.idSettingService.removeIdSetting(item.id).subscribe(res => {
              console.log(res.toString())
              this.allIdSetting();
            });
            this.regform.reset();
            this.IdSettingId = null;
          }
        }
      ]
    });

    await alert.present();
  }
  getIdSetting() {
    try {
      this.idSettingService.getAllIdSetting().subscribe(async result => {
        if (result.length > 0) {
          this.listOfIdSetting = await result;
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
  //paging function
  onTableDataChange(event) {
    this.page = event;
    this.getIdSetting();
  }
  onTableSizeChange(event): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getIdSetting();
  }

}
