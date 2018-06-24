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

@Component({
  selector: 'app-hisabkitab-job-list',
  templateUrl: './creditlist.component.html',
  styleUrls: ['./creditlist.component.css'],
  providers: [DatePipe]
})
export class CreditlistComponent extends SharedClass implements OnInit {
  isData = true;
  isNetwork = false;
  isServerError = false;
  loading: boolean;
  create_date: any;
  position: string;
  error: any;
  response: any;
  respData: any[];
  title = 'Credit History';
  constructor(public dialog: MatDialog, private data: DataService, private navbar: NavbarService, private dateFormatter: DatePipe,
              private rtr: Router, private apiObject: APICallService, private toast: ToastrService) {
    super(apiObject, rtr);
    this.data.changeMessage(this.title);
    this.navbar.invisi();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(PostcreditComponent, {
      height: '480px',
      width: '400px'
    });
  }
  // openStatus(i: any): void {}
  ngOnInit() {
    this.loading = true;
    super.ngOnInit();
    if (this.isLoggedIn()) {
      this.apiObject.fetchTransactions('C').subscribe(
        data => {
          this.response = data;
          console.log(this.response);
          this.respData = this.response.results;
          if (this.respData.length > 0) {
            this.isData = true;
            this.loading = false;
          } else {
            this.loading = false;
            this.isData = false;
          }
        }, error => {
          this.error = error.status;
          if (this.error >= 500) {
            this.isServerError = true;
            this.loading = false;
            this.toast.error('Server Error!', 'Error!');
          } else if (this.error === 0) {
            this.isNetwork = true;
            this.loading = false;
            this.toast.error('Please check your internet connection!', 'Data Loading');
          }
        }
      );
    } else {
      this.loading = false;
      // TODO: Implement promise returned by navigate
      this.rtr.navigate(['/', 'login']);
    }
  }
  dateFormat(date: any) {
    this.create_date =  this.dateFormatter.transform(date, 'dd-MM-yyyy');
  }
}
