import {Component, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';

// import {ToastrService} from 'ngx-toastr';

import {SharedClass} from '../../shared-class';
import {APICallService} from '../../service/api-service/apicall.service';
import {DataService} from '../../service/data-service/data.service';
import {NavbarService} from '../../service/navigation-bar/navbar.service';
import {FeedbackComponent} from '../feedback/feedback.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-newspage',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DatePipe]
})
export class DashboardComponent extends SharedClass implements OnInit {
  loading = true;
  title = 'हिसाब किताब';
  // isNet = false;
  constructor(private newsObject: APICallService, public navbar: NavbarService, private data: DataService, private rtr: Router,
              private dialog: MatDialog) {
    // private toast: ToastrService
    // public dateFormatter: DatePipe
    super(rtr);
    this.navbar.show();
    this.navbar.invisi();
    this.navbar.hideSearch();
    this.navbar.hideHome();
    this.navbar.hideLogin();
    this.navbar.hideDash();
    this.data.changeMessage(this.title);
  }
  ngOnInit() {
    super.ngOnInit();
   /* /!*For Loader*!/
    document.onreadystatechange = function () {
      if (document.readyState === 'loading') {
        document.getElementById('loaderId').style.display = 'block';
      } else if (document.readyState === 'complete') {
        document.getElementById('loaderId').style.display = 'none';
      }
    };*/
  }
  openFeedback() {
    const dialogRef = this.dialog.open(FeedbackComponent, {
      height: '440px',
      width: '400px'
    });
  }
}
