import { FormBuilder, Validators } from '@angular/forms';
import { Customer, PhoneNumber } from 'src/Tabels/tabels-list';
import { CustomerService } from '../Service/customer.service';
import { UserService } from '../Service/User.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController, ModalController } from '@ionic/angular';
import * as firebase from 'firebase/app';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { WindowService } from '../Service/window.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  windowRef: any;
  //phoneNumber = new PhoneNumber();
  verificationCode: string;
  user: any;

  regform = this.fb.group({});
  listOfCustomer: Customer[];
  selectedCustomer: any;
	recaptchaVerifier:firebase.auth.RecaptchaVerifier;
  phoneNumber:number;
  separateDialCode = false;
	SearchCountryField = SearchCountryField;
	CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
	preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
  constructor(private fb: FormBuilder, private customerService: CustomerService,
    private userService: UserService,private alertCtrl:AlertController,
    private modalController:ModalController,
    ) { }
    // afterViewInit() {
    //   this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    // }
  ngOnInit() {
    this.regform = this.fb.group({
      empId: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      phone:['',Validators.required]
    });
   this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
}
  save() {
    if (this.regform.valid) 
    {
      this.userService.create(this.regform.value).subscribe(res => {
        console.log(res.toString())
      });
    }
  }
  changePreferredCountries() {
		this.preferredCountries = [CountryISO.Ethiopia, CountryISO.Eritrea];
	}
 async getCustomerList() {
    this.customerService.getAllCustomer().subscribe(async customerList => {
      this.listOfCustomer = await customerList;
      this.selectedCustomer = customerList[0].id
    })
 }
 signIn(phoneNumber: any){
  const appVerifier = this.recaptchaVerifier;
  const phoneNumberString = phoneNumber.internationalNumber;
  firebase.auth().signInWithPhoneNumber(phoneNumberString, appVerifier)
    .then( async (confirmationResult) => {
    // SMS sent. Prompt user to type the code from the message, then sign the
    // user in with confirmationResult.confirm(code).
    let prompt = await this.alertCtrl.create({
    //title: 'Enter the Confirmation code',
    inputs: [{ name: 'confirmationCode', placeholder: 'Confirmation Code' }],
    buttons: [
      { text: 'Cancel',
      handler: data => { console.log('Cancel clicked'); }
      },
      { text: 'Send',
      handler: data => {
        confirmationResult.confirm(data.confirmationCode)
        .then(function (result) {
        // User signed in successfully.
        console.log(result.user);
        //this.router.navigateByUrl('login');
        this.modalController.dismiss();
        // ...
        }).catch(function (error) {
        // User couldn't sign in (bad verification code?)
        // ...
        });
      }
      }
    ]
    });
    await prompt.present();
  })
  .catch(function (error) {
    console.error("SMS not sent", error);
  });
  
  }

}
