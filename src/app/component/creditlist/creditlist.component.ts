import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
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
import {LogoutDialogComponent} from '../logout-dialog/logout-dialog.component';

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
  isDelete = false;
  name: string;
  amount: string;
  post_id: string;
  comment: string;
  create_date: any;
  filter_amount: any;
  filter_date: any;
  position: string;
  total_amount: any;
  total_count: any;
  modeID: any;
  error: any;
  params = {category: 'C'};
  price_sort: any;
  name_sort: any;
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
    this.getMode(this.apiObject);
  }
  ngOnInit() {
    this.loading = true;
    super.ngOnInit();
    this.data.filterData.subscribe((messsage) => {
      if (typeof messsage === 'object') {
        this.params = messsage;
        this.params.category = 'C';
      }
      console.log(this.params);
      this.apiObject.fetchTransactions(this.params).subscribe(
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

    });
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
  deletePost(i: any) {
    this.post_id = i.id;
    this.isDelete = true;
    this.data.passId(this.post_id);
    this.data.passDelete(this.isDelete);
    this.dialog.open(LogoutDialogComponent, {
      height: '150px',
      width: '250px'
    });
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
  pitch(event) {
    console.log(event);
    this.filter_amount = event.value;
  }
}
