import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-qty-detail',
  templateUrl: './qty-detail.page.html',
  styleUrls: ['./qty-detail.page.scss'],
})
export class QtyDetailPage implements OnInit {
@Input() public data;
  dataList: any[];
  constructor() { }

  ngOnInit() {
    this.dataList = Object.assign(this.data);
  //  console.log(this.dataList) 
  }

}
