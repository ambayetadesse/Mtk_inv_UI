import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ModalController, NavController, Platform } from '@ionic/angular';
import { AuthService } from '../Service/auth.service';
import intlTelInput from 'intl-tel-input';
import { AppComponent } from '../app.component';
import { UserPage } from '../user/user.page';
@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
	regform = this.fb.group({});
	fieldTextType: boolean;
	//public appCtrl: App
	public subscription: any;
	constructor(private authServices: AuthService, private router: Router,
		private alertCtrl: AlertController, private fb: FormBuilder,
		public navCtrl: NavController, private modalController: ModalController,
		private platform: Platform) { }
	ngOnInit() {
		this.regform = this.fb.group({
			username: ['', Validators.required],
			password: ['', Validators.required]
		});
	}
	signIn() {
		let userName = this.regform.get("username").value;
		let password = this.regform.get("password").value;
		let data = {
			empId: userName,
			userId: userName,
			username: userName,
			password: password
		}
		if (this.regform.valid) {
			console.log(data)
			this.authServices.getAllUser().subscribe(result => {
				//localStorage.setItem("token", result);
				console.log(result);
				let res = result.find(c => c.username == userName && c.password == password);
				if (res) {
					localStorage.setItem("userId", res.id);
					//localStorage.setItem("Authorization", "")
					this.router.navigate(['/menu']);
					//this.navCtrl.navigateRoot('AppComponent');
					this.presentAlert("Login successfully.");
					//window.location.reload()
					this.regform.reset();
				}
				else {
					this.presentAlert("Please enter correct username and password!!");
				}
			})
		}
	}
	ionViewDidEnter() {
		this.subscription = this.platform.backButton.subscribe(() => {
			navigator['app'].exitApp();
		});
	}

	ionViewWillLeave() {
		this.subscription.unsubscribe();
	}
	async presentAlert(message) {
		const alert = await this.alertCtrl.create({
			cssClass: 'my-custom-class',
			header: 'Login',
			// subHeader: 'Subtitle',
			message: message,
			buttons: ['OK']
		});
		await alert.present();
	}
	toggleFieldTextType() {
		this.fieldTextType = !this.fieldTextType;
	}
	async signIna(): Promise<void> {
		let userName = this.regform.get("username").value;
		let password = this.regform.get("password").value;
		this.authServices.getAllUser().subscribe(result => {
			let res = result.find(c => c.username == userName && c.password == password);
			if (res) {
				localStorage.setItem("userId", res.id);
				this.router.navigateByUrl('home');
				//new AppComponent();
			}
		}, async error => {
			const alert = await this.alertCtrl.create({
				message: error.message,
				buttons: [{ text: 'ok', role: 'cancel' }],
			});
			await alert.present();
		})
	}

	register() {
		this.modalController.create({
			component: UserPage,
			cssClass: 'register'
		}).then((modelElement) => {
			modelElement.present();
		})
	}
}
