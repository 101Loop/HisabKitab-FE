import {Component, HostListener, OnInit} from '@angular/core';
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
import {FeedbackComponent} from '../feedback/feedback.component';
import {st} from '@angular/core/src/render3';

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
  isPaging: boolean;
  isDisable: boolean;
  name: string;
  amount: string;
  post_id: string;
  comment: string;
  create_date: any;
  position: string;
  total_amount: any;
  total_count: any;
  page: string;
  count = 1;
  totalPage: number;
  modeID: any;
  error: any;
  params = {category: 'C', page: 1};
  response: any;
  respData: any[];
  PaymentmodeID: number;
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
      this.getData();
    });
  }
  getData() {
    this.params.page = this.count;
    this.apiObject.fetchTransactions(this.params).subscribe(
      data => {
        this.response = data;
        this.total_amount = this.response.total_amount;
        this.total_count = this.response.count;
        this.respData = this.response.results;
        this.totalPage = Math.ceil(this.response.count / 10);
        if (this.response.count > 0) {
          this.loading = false;
          this.isData = false;
        } else {
          this.loading = false;
          this.isData = true;
        }
        if (this.response.count > 10) {
          this.isPaging = true;
        }
      }, error => {
        this.loading = false;
        for (const mesg of error) {
          if (error[0] === 'Please check your internet connection!') {
            this.isNetwork = true;
          }
          this.toast.error(mesg);
        }
      }
    );
  }
  onNext() {
    if (this.count < this.totalPage ) {
    this.count = this.count + 1;
    this.getData();
  }
  }
  onBack() {
    if (this.count > 1) {
    this.count = this.count - 1;
    this.getData();
  }
  }
/*  // load next page data on scroll down
  @HostListener('window:scroll', ['$event'])
  onScroll(event) {
    if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight) {
        this.params.page = this.count + 1;
        this.getData();
    }
  }*/
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
    this.PaymentmodeID = i.mode.mode;
    this.data.passName(this.name);
    this.data.passAmount(this.amount);
    this.data.passComment(this.comment);
    this.data.passId(this.post_id);
    this.data.passModeId(this.PaymentmodeID);
    this.dialog.open(ShowStatusComponent, {
      height: '400px',
      width: '450px'
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
  openFeedback() {
    const dialogRef = this.dialog.open(FeedbackComponent, {
      height: '440px',
      width: '400px'
    });
  }
}
