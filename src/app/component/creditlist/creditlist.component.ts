import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';

import {ToastrService} from 'ngx-toastr';

import {DataService} from '../../service/data-service/data.service';
import {NavbarService} from '../../service/navigation-bar/navbar.service';
import {APICallService} from '../../service/api-service/apicall.service';
import {SharedClass} from '../../shared-class';
import {PostcreditComponent} from '../postcredit/postcredit.component';
import {ShowStatusComponent} from '../show-status/show-status.component';

@Component({
  selector: 'app-hisabkitab-job-list',
  templateUrl: './creditlist.component.html',
  styleUrls: ['./creditlist.component.css'],
  providers: [DatePipe]
})
export class CreditlistComponent extends SharedClass implements OnInit {
  isData = false;
  isNetwork = false;
  isServerError = false;
  loading: boolean;
  create_date: any;
  filter_amount: any;
  position: string;
  modeID: any;
  error: any;
  response: any;
  respData: any[];
  serach_query: any;
  title = 'Credit History';
  constructor(public dialog: MatDialog, private data: DataService, private navbar: NavbarService, private dateFormatter: DatePipe,
              private rtr: Router, private apiObject: APICallService, private toast: ToastrService) {
    super(rtr);
    this.data.changeMessage(this.title);
    this.navbar.invisi();
    this.navbar.showSearch();
    this.getData(event);
    this.getMode(this.apiObject);
  }
  ngOnInit() {
    this.loading = true;
    super.ngOnInit();
  }
  getData(event: any) {
    this.apiObject.fetchTransactions('C', this.serach_query, this.filter_amount, this.create_date, this.modeID).subscribe(
      data => {
        this.response = data;
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
  openDialog(): void {
    this.dialog.open(PostcreditComponent, {
      height: '560px',
      width: '400px'
    });
  }
  showStatus()  {
     this.dialog.open(ShowStatusComponent, {
      height: '560px'
    });
  }
  formatLabel(value: number) {
    this.filter_amount = value;
    if (!value) {
      return 0;
    }
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    return value;
  }
}
