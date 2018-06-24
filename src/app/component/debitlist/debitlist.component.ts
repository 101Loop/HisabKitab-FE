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
  create_date: any;
  position: any;
  error: any;
  title = 'Debit History';
  response: any;
  respData: any[];
  constructor(public dialog: MatDialog, public data: DataService, private navbar: NavbarService, private apiObject: APICallService,
              private dateFormatter: DatePipe, private rtr: Router,  private toast: ToastrService) {
    super(apiObject, rtr);
    this.data.changeMessage(this.title);
    this.navbar.invisi();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(PostdebitComponent, {
      height: '480px',
      width: '400px'
    });
  }
  // openStatus(i: any): void {}
  ngOnInit() {
    this.loading = true;
    super.ngOnInit();
    if (this.isLoggedIn()) {
      this.apiObject.fetchTransactions('D').subscribe(
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
          this.error = error.status;
          if (this.error >= 500) {
            this.isServerError = true;
            this.loading = false;
            this.toast.error('Server Error!', 'Error');
            } else {
            this.isNetwork = true;
            this.loading = false;
            this.toast.error('Please check your internet connection!', 'Data Loading');
          }
        }
      );
    } else {
      this.rtr.navigate(['/', 'login']);
    }
  }

  dateFormat(date: any) {
    // console.log(date);
     this.create_date =  this.dateFormatter.transform(date, 'dd-MM-yyyy');
  }
}
