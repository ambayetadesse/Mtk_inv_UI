import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuPage } from './menu.page';
const routes: Routes = [
  {
    path: 'menu',
    component: MenuPage,
    children: [
      {
        path: 'catagory',
        loadChildren: () => import('../catagory/catagory.module').then(m => m.CatagoryPageModule)
      },
      {
        path: 'lookup',
        loadChildren: () => import('../lookup/lookup.module').then(m => m.LookupPageModule)
      },
      {
        path: 'items',
        loadChildren: () => import('../items/items.module').then(m => m.ItemsPageModule)
      },
      {
        path: 'customer',
        loadChildren: () => import('../customer/customer.module').then(m => m.CustomerPageModule)
      },
      {
        path: 'supplier',
        loadChildren: () => import('../supplier/supplier.module').then(m => m.SupplierPageModule)
      },
      {
        path: 'item-category',
        loadChildren: () => import('../item-category/item-category.module').then(m => m.ItemCategoryPageModule)
      },
      {
        path: 'password-reset',
        loadChildren: () => import('../password-reset/password-reset.module').then(m => m.PasswordResetPageModule)
      },
      {
        path: 'sign-up',
        loadChildren: () => import('../sign-up/sign-up.module').then(m => m.SignUpPageModule)
      },
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'vendors',
        loadChildren: () => import('../vendors/vendors.module').then(m => m.VendorsPageModule)
      },
      {
        path: 'vocher',
        loadChildren: () => import('../vocher/vocher.module').then(m => m.VocherPageModule)
      },
      {
        path: 'id-setting',
        loadChildren: () => import('../id-setting/id-setting.module').then(m => m.IdSettingPageModule)
      },
      {
        path: 'recieve-payment',
        loadChildren: () => import('../recieve-payment/recieve-payment.module').then(m => m.RecievePaymentPageModule)
      },
      {
        path: 'pay-supplier',
        loadChildren: () => import('../pay-supplier/pay-supplier.module').then(m => m.PaySupplierPageModule)
      },
      {
        path: 'payment-details',
        loadChildren: () => import('../payment-details/payment-details.module').then(m => m.PaymentDetailsPageModule)
      },
      {
        path: 'vendor-modal',
        loadChildren: () => import('../vendors/vendor-modal/vendor-modal.module').then(m => m.VendorModalPageModule)
      },
      //generate report 
      {
        path: 'user',
        loadChildren: () => import('../user/user.module').then(m => m.UserPageModule)
      },
      {
        path: 'user-role',
        loadChildren: () => import('../user-role/user-role.module').then(m => m.UserRolePageModule)
      },
      {
        path: 'import',
        loadChildren: () => import('../import/import.module').then(m => m.ImportPageModule)
      },
      {
        path: 'report',
        loadChildren: () => import('../report/report.module').then(m => m.ReportPageModule)
      },

      {
        path: 'count-sheet',
        loadChildren: () => import('../count-sheet/count-sheet.module').then(m => m.CountSheetPageModule)
      },
      {
        path: 'logout',
        loadChildren: () => import('../logout/logout.module').then(m => m.LogoutPageModule)
      },
      {
        path: 'qty-detail',
        loadChildren: () => import('../vocher/qty-detail/qty-detail.module').then(m => m.QtyDetailPageModule)
      },
      {
        path: 'add-stock',
        loadChildren: () => import('../add-stock/add-stock.module').then(m => m.AddStockPageModule)
      },
      {
        path: 'store-transfer',
        loadChildren: () => import('../store-transfer/store-transfer.module').then(m => m.StoreTransferPageModule)
      },
      {
        path: 'count-stock',
        loadChildren: () => import('../count-stock/count-stock.module').then(m => m.CountStockPageModule)
      },
      {
        path: 'login',
        loadChildren: () => import('../login/login.module').then(m => m.LoginPageModule)
      },
     
      {
        path: '',
        redirectTo: '/menu/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'menu',
    redirectTo: '/menu/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule { }
