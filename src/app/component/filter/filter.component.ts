import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {SharedClass} from '../../shared-class';
import {Router} from '@angular/router';
import {APICallService} from '../../service/api-service/apicall.service';
import {DatePipe} from '@angular/common';
import {DataService} from '../../service/data-service/data.service';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
  providers: [DatePipe]
})
export class FilterComponent  extends SharedClass implements OnInit {
  modeID: number;
  create_date: any;
  search_query: string;
  filter_amount: string;
  price_sort: any;
  params: any;
  name_sort: any;
  constructor( private rtr: Router,  private apiObject: APICallService, private dateFormatter: DatePipe,
               private data: DataService, private dialogRef: MatDialogRef<FilterComponent>) {
    super(rtr);
  }
  ngOnInit() {
    super.ngOnInit();
    this.getMode(this.apiObject);
  }
  getFilter() {
    this.params = {category: 'C'};
    if (this.create_date) {this.params.transaction_date = this.create_date; }
    if (this.filter_amount) {this.params.amount = this.filter_amount; }
    if (this.search_query) {this.params.search = this.search_query; }
    if (this.modeID) {this.params.mode = this.modeID; }
    if (this.price_sort) {this.params.ordering = this.price_sort + 'amount'; }
    if (this.name_sort) {this.params.ordering = this.name_sort + 'contact__name'; }
    this.data.passfilter(this.params);
    this.dialogRef.close();
  }
}
