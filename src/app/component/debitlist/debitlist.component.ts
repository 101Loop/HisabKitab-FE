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
    this.getData(event);
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
  getData(event: any) {
    console.log(this.serach_query);
    this.apiObject.fetchTransactions('D', this.serach_query).subscribe(
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
}
