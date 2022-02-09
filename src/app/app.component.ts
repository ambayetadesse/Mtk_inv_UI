
import { Router } from '@angular/router';
import { LookupService } from './Service/lookup.service';
import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import {  AlertController, IonRouterOutlet, NavController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { functionality, Lookup, Menu, userRole, Users } from 'src/Tabels/tabels-list';
import { SharedService } from './Service/shared.service';
import { UserRoleService } from './Service/userRole.service';
import { FunctionalityService } from './Service/Functionality.service';
import { LoginPage } from './login/login.page';
import { HomePage } from './home/home.page';
import { AuthService } from './Service/auth.service';
import { UserService } from './Service/User.service';
import { title } from 'process';
import {Location} from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  vouchertype: Lookup[];
  name: string;
  selectedList: boolean = false;
  public selectedIndex1 = 11;
  listOfUserRole:userRole[];
  listOfFunctionality: functionality[];
  ListOfMenu:Menu[]=[];
  pageList: any[]=[];
  isRemainder:number=0;
  //@ViewChild('myNav') nav: NavController
  public rootPage: any = LoginPage;
  UserId: string;
  listOfUser: Users[];
  userName: string;
  changeText:boolean
  @ViewChild('productbtn', { read: ElementRef })productbtn: ElementRef;
  TitleName: any;
   usePicker: boolean;
  transcation:boolean;
  login: boolean;
  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList < IonRouterOutlet > ;
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private lookupService: LookupService,
    private router: Router,
    private sharedService: SharedService,
    private userRoleService:UserRoleService,
    private functionalityService:FunctionalityService,
    private authServices:AuthService,
    private alertCtrl:AlertController,
    private userService:UserService,
    private alertController:AlertController,
    private location: Location
  ) {
    // this.initializeApp();
    // Initialize BackButton Eevent.
    this.backButtonEvent();
  }
  // initializeApp() {
  //   this.platform.ready().then(() => {
  //     this.statusBar.styleDefault();
  //     this.splashScreen.hide();
  //   });
  //   this.ListOfMenu = [
  //     {
  //       title: 'Home',
  //       url: '/home',
  //       icon: 'home'
  //     },
  //     {
  //       title: 'Login',
  //       url: '/login',
  //       icon: 'log-in'
  //     },
  //     {
  //       title: 'Lookup Category',
  //       url: '/catagory',
  //       icon: 'list'
  //     },
  //     {
  //       title: 'lookup',
  //       url: '/lookup',
  //       icon: 'options'
  //     },
  //     {
  //       title: 'Items',
  //       url: 'items',
  //       icon: 'bar-chart'
  //     },
  //     {
  //       title: 'Customer Registration',
  //       url: '/customer',
  //       icon: 'person-circle'
  //     },
  //     {
  //       title: 'Item Category',
  //       url: '/item-category',
  //       icon: 'add-circle'
  //     },
  //     {
  //       title: 'Vendors',
  //       url: '/vendors',
  //       icon: 'add-circle'
  //     },
  //     {
  //       title: 'Id Setting',
  //       url: '/id-setting',
  //       icon: 'add-circle'
  //     },
  //     {
  //       title: 'Recieve Payment',
  //       url: '/recieve-payment',
  //       icon: 'add-circle'
  //     },
  //     {
  //       title: 'Pay Supplier',
  //       url: '/pay-supplier',
  //       icon: 'add-circle'
  //     },
  //     {
  //       title: 'User',
  //       url: '/user',
  //       icon: 'add-circle'
  //     },
  //     {
  //       title: 'User role',
  //       url: '/user-role',
  //       icon: 'add-circle'
  //     },
  //     {
  //       title:'Report',
  //       url:'report',
  //       icon:'bag-handle'
  //     },
  //     {
  //       title:'Transation',
  //       url:'/vocher',
  //       icon:'add-circle'
  //     },
  //     {
  //       title:'Import',
  //       url:'/import',
  //       icon:'download'
  //     },
  //     {
  //       title:'Count Sheet',
  //       url:'/count-sheet',
  //       icon:'add-circle'
  //     },
  //     {
  //       title:'Add Stock',
  //       url:'/add-stock',
  //       icon:'add-circle'
  //     },
  //     {
  //       title:'Store Transfer',
  //       url:'/store-transfer',
  //       icon:'add-circle'
  //     },
  //     {
  //       title:'Count Stock',
  //       url:'/count-stock',
  //       icon:'add-circle'
  //     }, 
  //   ];
  // }
  backButtonEvent() {
    this.platform.backButton.subscribeWithPriority(0, () => {
      this.routerOutlets.forEach(async(outlet: IonRouterOutlet) => {
        if (this.router.url != '/home') {
          // await this.router.navigate(['/']);
          await this.location.back();
        } else if (this.router.url === '/home') {
          if (new Date().getTime() - this.lastTimeBackPress >= this.timePeriodToExit) {
            this.lastTimeBackPress = new Date().getTime();
            this.presentAlertConfirm();
          } else {
            navigator['app'].exitApp();
          }
        }
      });
    });
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      // header: 'Confirm!',
      message: 'Are you sure you want to exit the app?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {}
      }, {
        text: 'Close App',
        handler: () => {
          navigator['app'].exitApp();
        }
      }]
    });
  
    await alert.present();
  }

  // show(): void {
  //   this.selectedList = !this.selectedList;
  // }
  
  ngOnInit() {
    if ((this.platform.is('mobile') && !this.platform.is('hybrid')) ||
    this.platform.is('desktop')
  ) {
    this.usePicker = true;
  }

  //   const path = window.location.pathname.split('folder/')[1];
  //   if (path !== undefined) {
  //    // this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
  //   }
  // this.getRoute();
  //   this.lookupService.getLookUpByType('HuXhQ8ChpLL3DbXQR6yh').subscribe(result => {
  //     if(result.length>0){
  //       this.vouchertype = result;
  //       this.name = result[0].name;
  //     }
  //     else{
  //  this.AlertInternet();
  //     }
  //    })
  }

  // async AlertInternet() {
  //   const alert = await this.alertController.create({
  //     cssClass: 'my-custom-class',
  //     header: 'Internet',
  //     // subHeader: 'Subtitle',
  //     message: 'Please turn on wifi or data',
  //     buttons: ['OK']
  //   });

  //   await alert.present();
  // }
  // getUser(){
  //   this.userService.getAllUser().subscribe(res=>{
  //     if(res.length>0){
  //       this.listOfUser = res;
  //       if(this.UserId !== "null"){
  //         this.userName = this.listOfUser.find(c=>c.id == this.UserId).username;
  //       }
  //     }
  //    else{
  //      this.AlertInternet();
  //    }
  //    //console.log(this.userName);
  //   })
  // }
  // getRoute()
  // { 
  //   this.functionalityService.getAllFunctionality().subscribe(result=>{
  //     this.listOfFunctionality = result;
  //     if(result.length>0){
  //       this.UserId= localStorage.getItem("userId");
  //       this.getUser();
  //    //  console.log(UserId);
  //        this.userRoleService.getUerRoleId(this.UserId).subscribe(res=>{
  //          if(res.length>0){
  //            this.login=true
  //            //To check transcation menu in user role
  //            let title=res.find(c=>c.funId=="13")
  //           res.forEach(element => {
  //              let isFound =this.listOfFunctionality.filter(c=>c.SN==+element.funId)
  //              if(isFound.length >0)
  //              {
  //               let rol =this.ListOfMenu.filter(c=>c.title== isFound[0].compName)[0];
  //               if(rol)
  //               {
  //                 let y={
  //                   title: isFound[0].compName,
  //                   url: rol.url,
  //                   icon: rol.icon
  //                 }
  //               this.pageList.push(y);
  //               if(title!=null)
  //               this.transcation=true
  //               }
  //               }
  //             });
  //          }
  //         })
  //     }
    
  //  //   console.log(result)
  //   })
  // }
  //   async logout():Promise<void> {
  //     this.authServices.logOutUser().
  //     then(
  //       ()=>{
  //         localStorage.setItem("userId",null)
  //         this.router.navigateByUrl('login');  
  //       },
  //       async error=>{
  //         const alert=await this.alertCtrl.create({
  //           message:error.message,
  //           buttons:[{text:'ok',role:'cancel'}],
  //         });
  //         await alert.present();
  //       }
  //     );
  // }
  // readPath(path) {
  //   this.router.navigate(['/vocher']);
  //   let voucher = {
  //     id: path.id,
  //     name: path.name
  //   }
  //   this.TitleName=path.name;
  //  //console.log(voucher);
  //   this.sharedService.VoucherTypeId.next(voucher)
  // }
}
