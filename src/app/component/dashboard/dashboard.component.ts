import {Component, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';

// import {ToastrService} from 'ngx-toastr';

import {SharedClass} from '../../shared-class';
import {APICallService} from '../../service/api-service/apicall.service';
import {DataService} from '../../service/data-service/data.service';
import {NavbarService} from '../../service/navigation-bar/navbar.service';

@Component({
  selector: 'app-newspage',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DatePipe]
})
export class DashboardComponent extends SharedClass implements OnInit {
  loading: boolean;
  title = 'Hisab Kitab (हिसाब किताब)';
  // isNet = false;
  constructor(private newsObject: APICallService, public navbar: NavbarService, private data: DataService, private rtr: Router) {
    // private toast: ToastrService
    // public dateFormatter: DatePipe
    super(rtr);
    this.navbar.show();
    this.navbar.invisi();
    this.data.changeMessage(this.title);
  }
  ngOnInit() {
    this.loading = true;
    super.ngOnInit();
  }
}
