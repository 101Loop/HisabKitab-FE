import {Component, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {SharedClass} from '../../shared-class';
import {ApicallService} from '../../service/api-service/apicall.service';
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
  title = 'Jyess Trading';
  isNet = false;
  constructor(private newsObject: ApicallService, public navbar: NavbarService, private data: DataService, public dateFormatter: DatePipe,
              private rtr: Router, private toast: ToastrService) {
    super(newsObject, rtr);
    this.navbar.show();
    this.navbar.invisi();
    this.data.changeMessage(this.title);
  }
  ngOnInit() {
    this.loading = true;
    super.ngOnInit();
  }
}
