import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';

import {ToastrService} from 'ngx-toastr';

import {SharedClass} from '../../shared-class';
import {DataService} from '../../service/data-service/data.service';
import {APICallService} from '../../service/api-service/apicall.service';
import {NavbarService} from '../../service/navigation-bar/navbar.service';
import {PostdebitComponent} from '../postdebit/postdebit.component';
import {ShowStatusComponent} from '../show-status/show-status.component';

@Component({
  selector: 'app-normal-job-list',
  templateUrl: './debitlist.component.html',
  styleUrls: ['./debitlist.component.css'],
  providers: [DatePipe]
})
export class DebitlistComponent extends SharedClass implements OnInit {
  isData = true;
  isNetwork = false;
  isServerError = false;
  loading: boolean;
  name: string;
  amount: string;
  post_id: string
  comment: string;
  create_date: any;
  position: any;
  filter_amount: any;
  filter_date: any;
  price_sort: any;
  name_sort: any;
  total_amount: any;
  total_count: any;
  error: any;
  modeID: any;
  title = 'Debit History';
  serach_query; any;
  response: any;
  respData: any[];
  constructor(public dialog: MatDialog, public data: DataService, private navbar: NavbarService, private apiObject: APICallService,
              private dateFormatter: DatePipe, private rtr: Router,  private toast: ToastrService) {
    super(rtr);
    this.data.changeMessage(this.title);
    this.navbar.invisi();
    this.navbar.showSearch();
    this.getData();
    this.getMode(this.apiObject);
  }
  openDialog(): void {
    this.dialog.open(PostdebitComponent, {
      height: '560px',
      width: '400px'
    });
  }
  // openStatus(i: any): void {}
  ngOnInit() {
    this.loading = true;
    super.ngOnInit();
  }
  getData() {
    this.apiObject.fetchTransactions('D', this.serach_query, this.filter_amount, this.filter_date, this.modeID, this.price_sort,
      this.name_sort).subscribe(
      data => {
        this.response = data;
        this.total_amount = this.response.total_amount;
        this.total_count = this.response.count;
        this.respData = this.response.results;
        if (this.respData.length > 0) {
          this.isData = true;
          this.loading = false;
        } else {
          this.loading = false;
          this.isData = false;
        }
      }, error => {
        this.loading = false;
        for (const mesg of error) {
          this.toast.error(mesg);
        }
      }
    );
  }
  dateFormat(date: any) {
    this.create_date =  this.dateFormatter.transform(date, 'yyyy-MM-dd');
  }
  showStatus(i: any)  {
    this.name = i.contact.name;
    this.amount = i.amount;
    this.comment = i.comments;
    this.post_id = i.id;
    this.data.passName(this.name);
    this.data.passAmount(this.amount);
    this.data.passComment(this.comment);
    this.data.passId(this.post_id);
    this.dialog.open(ShowStatusComponent, {
      height: '400px'
    });
  }
  formatLabel(value: number) {
    this.create_date = value;
    if (!value) {
      return 0;
    }
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    return value;
  }
  pitch(event) {
    this.filter_amount = event.value;
  }
}
