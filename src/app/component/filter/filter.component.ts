import { Component, OnInit } from '@angular/core';
import {SharedClass} from '../../shared-class';
import {Router} from '@angular/router';
import {APICallService} from '../../service/api-service/apicall.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
  providers: [DatePipe]
})
export class FilterComponent  extends SharedClass implements OnInit {
  modeID: number;
  create_date: any;
  serach_query: string;
  filter_amount: string;
  price_sort: any;
  name_sort: any;
  constructor( private rtr: Router,  private apiObject: APICallService, private dateFormatter: DatePipe) {
    super(rtr);
  }
  ngOnInit() {
    super.ngOnInit();
    this.getMode(this.apiObject);
  }
  formatLabel(value: number) {
    if (!value) {
      return 0;
    }
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    return value;
  }
  /**To tranform date to this "dd-MM-yyyy" standard format**/
  dateFormat(date: any) {
  //  this.create_date =  this.dateFormatter.transform(date, 'yyyy-MM-dd');
  }
  getFilter() {
    console.log(this.create_date, this.filter_amount, this.modeID, this.name_sort, this.price_sort, this.serach_query);
  }
}
