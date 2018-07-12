///<reference path="../../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';
import {DatePipe, Location} from '@angular/common';

import {NavbarService} from '../../service/navigation-bar/navbar.service';
import {DataService} from '../../service/data-service/data.service';
import {APICallService} from '../../service/api-service/apicall.service';
import {SharedClass} from '../../shared-class';
import {LogoutDialogComponent} from '../logout-dialog/logout-dialog.component';
import {FeedbackComponent} from '../feedback/feedback.component';
import {FormControl, FormGroup} from '@angular/forms';
import {ContactComponent} from '../contact/contact.component';
import {timer} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DatePipe]
})
export class AppComponent extends SharedClass implements OnDestroy, OnInit {
  mobileQuery: MediaQueryList;
  title: string;
  isSearch = false;
  isShare = false;
  isFilter = false;
  isDelete = false;
  modeID: number;
  create_date: any;
  search_query: string;
  filter_amount: string;
  min_amount: string;
  max_amount: string;
  price_sort: any;
  params: any;
  loading: boolean;
  is_H2Lclicked = false;
  isL2Hclicked = true;
  is_AtZclicked = false;
  is_ZtAclicked = true;
  name_sort: any;
  time: string;
  i: number;
  inputElements: any;
  Filterform: FormGroup;
  notification: any;
  Cash = 1;
  Cheque = 2;
  Account = 3;
  private readonly _mobileQueryListener: () => void;

  constructor(public dialog: MatDialog, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, public navbar: NavbarService,
              private data: DataService, public location: Location, private rtr: Router, private apiObject: APICallService,
              private timeFormat: DatePipe) {
    // public dialog: MatDialog,
    super(rtr);
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    super.ngOnInit();
    this.data.currentMessage.subscribe(message => this.title = message);
    this.getMode(this.apiObject);
    this.Filterform = new FormGroup({
      'Fname': new FormControl('', []),
      'FAmount': new FormControl('', []),
      'Fdate': new FormControl('', []),
      'FMinAmt': new FormControl('', []),
      'FMaxAmt': new FormControl('', []),
    });
    /*Will call timeFormat function after every 60sec */
    timer(1000, 1000 * 60).subscribe(t => {
      this.timeFormator(new Date());
    });
    // setInterval(function() { alert('Do you add your Transaction'); }, 1000 * 60 * 60 * 6);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  onLogout() {
    this.data.passDelete(this.isDelete);
    this.dialog.open(LogoutDialogComponent, {
      height: '150px',
      width: '250px'
    });
  }

  goback() {
    this.rtr.navigate(['/', 'login']);
    window.location.reload();
  }

  Reload() {
    window.location.reload();
  }

  openFilter() {
    /* const dialogRef = this.dialog.open(FilterComponent, {
       height: '400px',
       width: '400px'
     });*/
  }
  getFilter() {
    this.params = {category: 'C'};
    if (this.create_date) {
      this.params.transaction_date = this.create_date;
    }
    if (this.filter_amount) {
      this.params.amount = this.filter_amount;
    }
    if (this.search_query) {
      this.params.search = this.search_query;
    }
    if (this.Cash) {
      this.params.mode = this.Cash;
    }
    if (this.Cheque) {
      this.params.mode = this.Cheque;
    }
    if (this.Account) {
      this.params.mode = this.Account;
    }
    if (this.price_sort) {
      this.params.ordering = this.price_sort + 'amount';
    }
    if (this.name_sort) {
      this.params.ordering = this.name_sort + 'contact__name';
    }
    if (this.min_amount) {
      this.params.start_amount = this.min_amount;
    }
    if (this.max_amount) {
      this.params.end_amount = this.max_amount;
    }
   // console.log(this.params);
    this.data.passfilter(this.params);
    this.isFilter = !this.isFilter;
    this.Filterform.reset();
  }

  openFeedback() {
    const dialogRef = this.dialog.open(FeedbackComponent, {
      height: '440px',
      width: '400px'
    });
  }

  onContact() {
    this.dialog.open(ContactComponent, {
      height: 'auto'
    });
  }

  /**For Sending Timely Notification**/
  timeFormator(time: any) {
    this.time = this.timeFormat.transform(time, 'H-mm');
    if (this.time === '09-00') {
      this.notifyMe();
    }
    if (this.time === '18-22') {
      this.notifyMe();
    }
    if (this.time === '12-21') {
      this.notifyMe();
    }
    if (this.time === '22-07') {
      this.notifyMe();
    }
  }

  notifyMe() {
    if (!('Notification' in window)) {
      alert('This browser does not support desktop notification');
    } else if (Notification.prototype.permission === 'granted') {
      // If it's okay let's create a notification
      this.notification = new Notification('Hi there!', <NotificationOptions>{
        body: 'Have you added your daily transaction details?',
        vibrate: [200, 100, 200, 100, 200, 100, 200],
        tag: 'Hisab-kitab'
      });
    } else if (Notification.prototype.permission !== 'denied') {
      // Otherwise, we need to ask the user for permission
      Notification.requestPermission(function (permission) {
        // If the user accepts, let's create a notification
        if (permission === 'granted') {
          const notification = new Notification('Hi there!', <NotificationOptions>{
            body: 'Are you maintaining your #HisabKitab?',
            vibrate: [200, 100, 200, 100, 200, 100, 200],
            tag: 'Hisab-kitab'
          });
        }
      });
    }
  }
}
