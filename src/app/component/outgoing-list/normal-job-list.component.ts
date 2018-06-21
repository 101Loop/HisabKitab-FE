import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {DatePipe} from '@angular/common';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {SharedClass} from '../../shared-class';
import {DataService} from '../../service/data-service/data.service';
import {ApicallService, GetOutgoingData} from '../../service/api-service/apicall.service';
import {NavbarService} from '../../service/navigation-bar/navbar.service';
import {NormalrequestComponent} from '../post-outgoing/normalrequest.component';
@Component({
  selector: 'app-normal-job-list',
  templateUrl: './normal-job-list.component.html',
  styleUrls: ['./normal-job-list.component.css'],
  providers: [DatePipe]
})
export class NormalJobListComponent extends SharedClass implements OnInit {
  isData = true;
  isNetwork = false;
  loading: boolean;
  create_date: any;
  position: any;
  salary: any;
  urgency: any;
  creat_ed_by: any;
  gender: any;
  desc: any;
  stat_us: any;
  post_id: any;
  error: string;
  organization: string;
  title = 'Outgoing';
  response: any;
  respData: any[];
  pos: string;
  constructor(public dialog: MatDialog, public data: DataService, private navbar: NavbarService, private normalObject: ApicallService,
              private dateFormatter: DatePipe, private rtr: Router,  private toast: ToastrService) {
    super(normalObject, rtr);
    this.data.changeMessage(this.title);
    this.navbar.invisi();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(NormalrequestComponent, {
      height: '480px',
      width: '400px'
    });
  }
  openStatus(i: any): void {
 /*   this.position = i.position;
    this.salary = i.salary;
    this.urgency = i.urgency;
    this.gender = i.gender;
    this.desc = i.description;
    this.post_id = i.id;
    this.organization = this.org;
    this.data.passPosition(this.position);
    this.data.passSalary(this.salary);
    this.data.passUrgency(this.urgency);
    this.data.passGender(this.gender);
    this.data.passDesc(this.desc);
    this.data.passPost(this.post_id);
    this.data.passOrg(this.organization);
    const dialogRef = this.dialog.open(VacancyStatusComponent, {
      height: '560px'
    });*/
  }
  ngOnInit() {
    this.loading = true;
    super.ngOnInit();
    /* To check if user is logged in or logged out, if logout then it will redirect user to login page */
    if (this.token) {
      const passData = new GetOutgoingData();
      this.normalObject.getOutgoingData(passData).subscribe(
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
          this.error = error;
          if (this.error) {
            this.isNetwork = true;
            this.loading = false;
           // this.toast.error('Please check your internet connection!', 'Data Loading!');
          }
          console.log(this.error);
        }
      );
    } else {
      console.log('Redirected to Login!');
      this.rtr.navigate(['/', 'login']);
    }
  }

  dateFormat(date: any) {
    // console.log(date);
     this.create_date =  this.dateFormatter.transform(date, 'dd-MM-yyyy');
  }
  positionFormet(position: any) {
    this.pos = position.replace(/ /g, '+');
  }
}
