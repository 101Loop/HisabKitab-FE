import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {DataService} from '../../service/data-service/data.service';
import {NavbarService} from '../../service/navigation-bar/navbar.service';
import {ApicallService, GetIncomingData} from '../../service/api-service/apicall.service';
import {SharedClass} from '../../shared-class';
import {FlexyrequestComponent} from '../post-incoming/flexyrequest.component';

 @Component({
  selector: 'app-flexy-job-list',
  templateUrl: './flexy-job-list.component.html',
  styleUrls: ['./flexy-job-list.component.css'],
  providers: [DatePipe]
})
export class FlexyJobListComponent extends SharedClass implements OnInit {
  isData = true;
  isNetwork = false;
  loading: boolean;
  create_date: any;
  position: string;
  salary: string;
  time: string;
  created_by: string;
  gender: string;
  desc: string;
  status: string;
  post_id: string;
  organization: string;
  error: string;
  response: any;
  respData: any[];
  title = 'Incoming';
  message = 'hello';
  pos: string;
  constructor(public dialog: MatDialog, private data: DataService, private navbar: NavbarService, private flexyObject: ApicallService,
              private dateFormatter: DatePipe, private rtr: Router, private apiObject: ApicallService, private toast: ToastrService) {
    super(apiObject, rtr);
    this.data.changeMessage(this.title);
    this.navbar.invisi();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(FlexyrequestComponent, {
      height: '480px',
      width: '400px'
    });
  }
  openStatus(i: any): void {
   /* console.log(i);
    this.position = i.position;
    this.salary = i.salary;
    this.time = i.timeperiod;
    this.gender = i.gender;
    this.desc = i.description;
    this.post_id = i.id;
    this.organization = this.org;
    this.data.passPosition(this.position);
    this.data.passSalary(this.salary);
    this.data.passTime(this.time);
    this.data.passGender(this.gender);
    this.data.passDesc(this.desc);
    this.data.passPost(this.post_id);
    this.data.passOrg(this.organization);
    const dialogRef = this.dialog.open(FlexyVacancyStatusComponent, {
      height: '560px'
    });*/
  }
  ngOnInit() {
    this.loading = true;
    super.ngOnInit();
    if (this.token) {
      const passData = new GetIncomingData();
      this.flexyObject.getIncomingData(passData).subscribe(
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
          this.error = error;
          if (this.error) {
            this.isNetwork = true;
            this.loading = false;
            this.toast.error('Please check your internet connection!', 'Data Loading!');
          }
        }
      );
    } else {
      this.loading = false;
      this.rtr.navigate(['/', 'login']);
    }
  }
  dateFormat(date: any) {
    this.create_date =  this.dateFormatter.transform(date, 'dd-MM-yyyy');
  }
  positionFormet(position: any) {
    this.pos = position.replace(/ /g, '+');
  }
}
