import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, Platform } from '@ionic/angular';
import { Items } from 'src/Tabels/tabels-list';
import { AuthService } from '../Service/auth.service';
import { ItemsService } from '../Service/items.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.page.html',
	styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
	listOfItems: Items[];
	searchText: string;
	filteredItemsSearch: any;
	public subscription: any;
	loader: any;
	constructor(private authServices: AuthService, private router: Router,
		private alertCtrl: AlertController, private itemsService: ItemsService,
		private platform:Platform,private loadingController:LoadingController) { }
	async ngOnInit() {
		this.loader = await this.loadingController.create({
			message: 'data loading ...',
			spinner: "bubbles",
			//duration: 2000,
			animated: true
		});
		// await this.loader.present().then();
		this.itemsService.getAllItem().subscribe(async res => {
			this.listOfItems = await  res;
		}, async (err) => {
			await this.loader.dismiss().then();
			console.log(err);
		})
	}
	ionViewDidEnter() {
		this.subscription = this.platform.backButton.subscribe(() => {
		  navigator['app'].exitApp();
		});
	  }
	
	  ionViewWillLeave() {
		this.subscription.unsubscribe();
	  }
	filter(query) {
		this.filteredItemsSearch = (query.target.value) ?
		  this.listOfItems.filter(p => p.name.toLowerCase().includes(query.target.value.toLowerCase())) :
		  this.listOfItems;
	  }
	async logOut(): Promise<void> {
		this.authServices.logOutUser().
			then( () => {
					localStorage.setItem("userId", null)
					this.router.navigateByUrl('login');
				},
				async error => {
					const alert = await this.alertCtrl.create({
						message: error.message,
						buttons: [{ text: 'ok', role: 'cancel' }],
					});
					await alert.present();
				}
			);
	}
	doRefresh(ev) {
		setTimeout(() => {
			this.itemsService.getAllItem().subscribe(async res => {
				this.listOfItems = await res;
			})
			ev.target.complete();
		}, 2000);
	}
}
