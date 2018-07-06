import {Component, HostListener, OnInit} from '@angular/core';
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
import {LogoutDialogComponent} from '../logout-dialog/logout-dialog.component';
import {FeedbackComponent} from '../feedback/feedback.component';

@Component({
  selector: 'app-normal-job-list',
  templateUrl: './debitlist.component.html',
  styleUrls: ['./debitlist.component.css'],
  providers: [DatePipe]
})
export class DebitlistComponent extends SharedClass implements OnInit {
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
  position: any;
  total_amount: any;
  total_count: any;
  params = {category: 'D'};
  error: any;
  PaymentmodeID: number;
  title = 'Debit History';
  response: any;
  respData: any[];
  constructor(public dialog: MatDialog, public data: DataService, private navbar: NavbarService, private apiObject: APICallService,
              private dateFormatter: DatePipe, private rtr: Router,  private toast: ToastrService) {
    super(rtr);
    this.data.changeMessage(this.title);
    this.navbar.invisi();
    this.navbar.showSearch();
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
    this.data.filterData.subscribe((messsage) => {
      if (typeof messsage === 'object') {
        this.params = messsage;
        this.params.category = 'D';
      }
      this.getData();
    });
  }
  getData() {
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
          if (error[0] === 'Please check your internet connection!') {
              this.isNetwork = true;
            this.isData = true;
          } else
          if (error[0] === 'A server side error occurred. Please report this to info@vitartha.com') {
            this.isServerError = true;
            this.isData = true;
          }
          }
          console.log(error[0]);
      }
    );
  }
  @HostListener('window:scroll', ['$event'])
  onScroll(event) {
    if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight) {
      console.log('bottom');
      //  this.getData();
    }
  }
  dateFormat(date: any) {
    this.create_date =  this.dateFormatter.transform(date, 'yyyy-MM-dd');
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
