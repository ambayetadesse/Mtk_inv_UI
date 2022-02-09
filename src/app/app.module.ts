
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './Service/auth-interceptor.service';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { ToastrModule } from 'ngx-toastr';
import {
  DxLookupModule, DxTemplateModule,
  DxDataGridModule,
  DxSelectBoxModule,
  DxCheckBoxModule, DxChartModule, DxPopoverModule,
  DxActionSheetModule, DxListModule, DevExtremeModule
} from 'devextreme-angular';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppErrorHandler } from './common/app-error-handler';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ValidateDirective } from './validate-directive.directive';
import { PapaParseModule } from 'ngx-papaparse';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
@NgModule({
  declarations: [AppComponent, ValidateDirective],
  entryComponents: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    NgbModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    DxLookupModule, DxTemplateModule,
    Ng2SearchPipeModule,
    DxDataGridModule,
    DxSelectBoxModule,
    DxCheckBoxModule,
    PapaParseModule,
    DxPopoverModule,
    DxChartModule,
    NgxPaginationModule,
    DxActionSheetModule, DxListModule,
    DevExtremeModule,
    NgxIntlTelInputModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: ErrorHandler, useClass: AppErrorHandler },
    // File
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
