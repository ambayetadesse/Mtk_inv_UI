import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { functionality, Lookup, Menu, userRole, Users } from 'src/Tabels/tabels-list';
import { LoginPage } from '../login/login.page';
import { AuthService } from '../Service/auth.service';
import { FunctionalityService } from '../Service/Functionality.service';
import { LookupService } from '../Service/lookup.service';
import { SharedService } from '../Service/shared.service';
import { UserService } from '../Service/User.service';
import { UserRoleService } from '../Service/userRole.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  public selectedIndex = 0;
  vouchertype: Lookup[];
  name: string;
  selectedList: boolean = false;
  public selectedIndex1 = 11;
  listOfUserRole: userRole[];
  listOfFunctionality: functionality[];
  ListOfMenu1: Menu[] = [];
  pageList: any[] = [];
  isRemainder: number = 0;
  //@ViewChild('myNav') nav: NavController
  public rootPage: any = LoginPage;
  UserId: number;
  listOfUser: Users[];
  userName: string;
  changeText: boolean
  @ViewChild('productbtn', { read: ElementRef }) productbtn: ElementRef;
  TitleName: any;
  usePicker: boolean;
  transcation: boolean;
  roleType: string;
  constructor(
    private platform: Platform,
    private lookupService: LookupService,
    private router: Router,
    private sharedService: SharedService,
    private userRoleService: UserRoleService,
    private functionalityService: FunctionalityService,
    private authServices: AuthService,
    private alertCtrl: AlertController,
    private userService: UserService,
    private alertController: AlertController,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public nav: NavController
  ) {
    // this.initializeApp();
  }

  show(): void {
    this.selectedList = !this.selectedList;
  }

  ngOnInit() {

    if ((this.platform.is('mobile') && !this.platform.is('hybrid')) ||
      this.platform.is('desktop')
    ) {
      this.usePicker = true;
    }
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      // this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
    this.ListOfMenu1 = [
      {
        title: 'Home',
        url: 'home',
        icon: 'home'
      },
      {
        title: 'Login',
        url: 'login',
        icon: 'log-in'
      },
      {
        title: 'Lookup Category',
        url: 'catagory',
        icon: 'list'
      },
      {
        title: 'Lookup',
        url: 'lookup',
        icon: 'options'
      },
      {
        title: 'Items',
        url: 'items',
        icon: 'bar-chart'
      },
      {
        title: 'Customer Registration',
        url: 'customer',
        icon: 'person-circle'
      },
      {
        title: 'Item Category',
        url: 'item-category',
        icon: 'add-circle'
      },
      {
        title: 'Vendors',
        url: 'vendors',
        icon: 'add-circle'
      },
      {
        title: 'Id Setting',
        url: 'id-setting',
        icon: 'add-circle'
      },
      {
        title: 'Recieve Payment',
        url: 'recieve-payment',
        icon: 'add-circle'
      },
      {
        title: 'Pay Supplier',
        url: 'pay-supplier',
        icon: 'add-circle'
      },
      {
        title: 'User',
        url: 'user',
        icon: 'add-circle'
      },
      {
        title: 'User role',
        url: 'user-role',
        icon: 'add-circle'
      },
      {
        title: 'Report',
        url: 'report',
        icon: 'bag-handle'
      },
      {
        title: 'Transation',
        url: 'vocher',
        icon: 'add-circle'
      },
      {
        title: 'Import',
        url: 'import',
        icon: 'download'
      },
      {
        title: 'Count Sheet',
        url: 'count-sheet',
        icon: 'add-circle'
      },
      {
        title: 'Add Stock',
        url: 'add-stock',
        icon: 'add-circle'
      },
      {
        title: 'Store Transfer',
        url: 'store-transfer',
        icon: 'add-circle'
      },
      {
        title: 'Count Stock',
        url: 'count-stock',
        icon: 'add-circle'
      },
    ];
    this.getRoute();
    this.lookupService.getAllLookUp().subscribe(res => {
      let result = res.filter(c => c.type == 1);
      if (result.length > 0) {
        this.vouchertype = result;
        this.name = result[0].name;
      }
      else {
        this.AlertInternet();
      }
    })
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
  getUser() {
    this.userService.getAllUser().subscribe(res => {
      if (res.length > 0) {
        this.listOfUser = res;
        if (this.UserId !== 0) {
          this.userName = this.listOfUser.find(c => c.id == this.UserId).username;
        }
      }
      else {
        this.AlertInternet();
      }
      //  console.log(this.userName);
    })
  }
  getRoute() {
    this.functionalityService.getAllFunctionality().subscribe(result => {
      this.listOfFunctionality = result;
      if (result.length > 0) {
        this.UserId = +localStorage.getItem("userId");
        this.getUser();
        this.userRoleService.getAllUserRole().subscribe(result => {
          // console.log(result);
          let res = result.filter(c => c.userId == this.UserId);
          if (res.length > 0) {
            //To check transcation menu in user role
            let title = res.find(c => c.funId == 13)
            res.forEach(element => {
              let isFound = this.listOfFunctionality.filter(c => c.id == +element.funId)
              if (isFound.length > 0) {
                let rol = this.ListOfMenu1.filter(c => c.title == isFound[0].compName)[0];
                if (rol) {
                  let y = {
                    title: isFound[0].compName,
                    url: rol.url,
                    icon: rol.icon
                  }
                  this.pageList.push(y);
                  //  console.log(this.pageList)
                  if (title != null)
                    this.transcation = true
                }
              }
            });
          }
        })
      }

      // console.log(result)
    })
  }
  async logout(): Promise<void> {
    localStorage.setItem("userId", null);
    localStorage.setItem("fullName", null);
    localStorage.setItem("active", null);
    localStorage.setItem("roleType", null);
    this.router.navigateByUrl('login');
    async error => {
      const alert = await this.alertCtrl.create({
        message: error.message,
        buttons: [{ text: 'ok', role: 'cancel' }],
      });
      await alert.present();
    }
  }
  readPath1(path) {
    let pa = path.url
    this.router.navigate(["/menu/" + pa]);
  }
  readPath(path) {
    if (path.name == "Store Transfer") {
      this.router.navigate(['/menu/store-transfer']);
    } else {
      this.router.navigate(['/menu/vocher']);
      let voucher = {
        id: path.id,
        name: path.name
      }
      this.TitleName = path.name;

      this.sharedService.VoucherTypeId.next(voucher)
    }
  }
  openPage(page) {
    this.nav.setDirection(page)
  }
}

