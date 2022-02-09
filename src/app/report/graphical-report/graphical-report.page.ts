import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DxChartComponent } from 'devextreme-angular';
import { VocherService } from 'src/app/Service/vocher.service';
import { Vocher } from 'src/Tabels/tabels-list';
@Component({
  selector: 'app-graphical-report',
  templateUrl: './graphical-report.page.html',
  styleUrls: ['./graphical-report.page.scss'],
})
export class GraphicalReportPage implements OnInit {
  @ViewChild(DxChartComponent, { static: false }) component: DxChartComponent;
  goodReList: Vocher[];
  saleOrdList: Vocher[];
  cashSaleList: Vocher[];
  purchaseList: Vocher[];
  goodrecieveTotal: number = 0;
  saleOrderTotal: number = 0;
  cashSaleTotal: number = 0;
  purchaseOrderTotal: number = 0;
  graphicalReportList: any[] = [];
  regform: FormGroup;
  // minselectDate = new Date().toDateString();
  minselectDate = new Date().toISOString();
  maxselectedDate = new Date().toISOString();
  currentDate = new Date().toISOString();
  minDate = new Date().toISOString();
  maxDate = new Date().toISOString();
  mindate: string;
  maxdate: string;
  public defaultFrom: string;
  public defaultTo: string;
  public deltas: string[];
  constructor(private voucherService: VocherService, private fb: FormBuilder) {
    // this.defaultFrom = "2019-08-01 00:00:00 AM";
    // this.defaultTo = "2019-08-09 01:02:03 AM";
    // this.deltas = [];
    // this.parseDates( this.defaultFrom, this.defaultTo );
    //this.parseDates( this.defaultFrom, this.defaultTo );
  }
  ngOnInit() {
    this.regform = this.fb.group({
      mindate: [""],
      maxdate: [""],
      selectedOption: []
    })
    //setting min date
    let date: Date = new Date();
    date.setDate(date.getDate() - 15);
    this.minDate = date.toISOString();
    //setting max date
    date = new Date();
    date.setDate(date.getDate() + 15);
    this.maxDate = date.toISOString();
    this.mindate = this.minselectDate;
    this.maxdate = this.maxselectedDate;
    this.getGrahicalReport(this.mindate, this.maxdate);
  }

  SelectedValueMinDate(ev) {
    this.mindate = this.regform.get("mindate").value;
    this.maxdate = this.regform.get("maxdate").value;
    // this.getGrahicalReport(this.mindate,this.maxdate);
  }
  selectOption(ev) {
    if (ev.target.value == "weekly") {
      var events = [];
      for (var i = 0; i < 50; i += 1) {
        var date = new Date();
        var startDay = Math.floor(Math.random() * 90) - 45;
        var endDay = Math.floor(Math.random() * 2) + startDay;
        var startTime;
        var endTime;
        startTime = new Date(
          Date.UTC(
            date.getUTCFullYear(),
            date.getUTCMonth(),
            date.getUTCDate() + startDay
          )
        );
        if (endDay === startDay) {
          endDay += 1;
        }
        endTime = new Date(
          Date.UTC(
            date.getUTCFullYear(),
            date.getUTCMonth(),
            date.getUTCDate() + endDay
          )
        );
        events.push({
          title: 'All Day - ' + i,
          startTime: startTime,
          endTime: endTime,
          allDay: true,
        });
        //console.log(events)
      }
      this.mindate = this.minselectDate;
      this.maxdate = this.maxselectedDate;
    }
  }
  getGrahicalReport(mindate: string, maxdate: string) {
    //good recieve list of data
    this.graphicalReportList = [];
    this.goodrecieveTotal = 0;
    this.saleOrderTotal = 0;
    this.cashSaleTotal = 0;
    this.purchaseOrderTotal = 0;
    this.voucherService.getAllVocher().subscribe(async re => {
     await re.filter(c => c.vocherTypeId == 1 && c.date >= mindate && c.date <= maxdate).forEach(element => {
        this.goodrecieveTotal += element.subTotal;
      })
      let gr = {
        id: '1',
        name: 'good recieve',
        totalAmount: this.goodrecieveTotal
      }
      this.graphicalReportList.push(gr);
    })
    //sale order list of data
    this.voucherService.getAllVocher().subscribe(async re => {
     await re.filter(c => c.vocherTypeId == 3 && c.date >= mindate && c.date <= maxdate).forEach(el => {
        this.saleOrderTotal += el.subTotal;
      })
      let gr1 = {
        id: '2',
        name: 'sale order',
        totalAmount: this.saleOrderTotal
      }
      this.graphicalReportList.push(gr1);
    })
    //cash sale list of data 
    this.voucherService.getAllVocher().subscribe(async re => {
     await re.filter(c => c.vocherTypeId == 4 && c.date >= mindate && c.date <= maxdate).forEach(ele => {
        this.cashSaleTotal += ele.subTotal;
      })
      let gr2 = {
        id: '3',
        name: 'cash sale',
        totalAmount: this.cashSaleTotal
      }
      this.graphicalReportList.push(gr2);
    })
    //purchase order list of data
    this.voucherService.getAllVocher().subscribe(async re => {
     await re.filter(c => c.vocherTypeId == 5 && c.date >= mindate && c.date <= maxdate).forEach(elem => {
        this.purchaseOrderTotal += elem.subTotal;
      })
      let gr3 = {
        id: '4',
        name: 'purchase order',
        totalAmount: this.purchaseOrderTotal
      }
      this.graphicalReportList.push(gr3);
      console.log(this.graphicalReportList)
    })
  }
  onPointClick(e) {
    e.target.select();
  }
}
