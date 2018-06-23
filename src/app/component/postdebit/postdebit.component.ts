import { Component, OnInit } from '@angular/core';
import {SuccessMessageComponent} from '../success-message/success-message.component';
import {MatDialog, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {SharedClass} from '../../shared-class';
import {AddOutgoing, ApicallService} from '../../service/api-service/apicall.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-normalrequest',
  templateUrl: './postdebit.component.html',
  styleUrls: ['./postdebit.component.css'],
  providers: [DatePipe]
})
export class PostdebitComponent extends SharedClass implements OnInit {
  loading: boolean;
  date: any = new Date();
  create_date: any;
  contact: string;
  amount: string;
  boxid: string;
  selectedMode: string;
  response: any;
  list: any;
  mode1: string;
  category = '-';
  normalForm: FormGroup;
  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<PostdebitComponent>,
              private postObject: ApicallService, private toast: ToastrService, private rtr: Router,
              private apiObject: ApicallService, private dateFormatter: DatePipe) {
    super(apiObject, rtr);
    this.dateFormat(this.date);
    this.list = this.mode_api_results;
  }
  ngOnInit() {
    super.ngOnInit();
    this.normalForm = new FormGroup({
      'position': new FormControl('', [Validators.required]),
      'org': new FormControl('', [Validators.required]),
      'salary': new FormControl('', [Validators.required]),
      'desc': new FormControl('', [Validators.required])
    });
    this.getMode();
  }

  onSuccess(): void {
    this.loading = true;
    const passData = new AddOutgoing(this.create_date, this.contact, this.amount, this.selectedMode, this.category);
    this.postObject.postOutgoing(passData).subscribe(
      data => {
        this.loading = false;
        this.response = data;
        //  this.toast.success('Posting successfully Posted', 'Posting');
          this.dialogRef.close();
          const dialogRef = this.dialog.open(SuccessMessageComponent, {
          });
      }, error => {
        this.loading = false;
        this.response = error;
        console.log(this.response);
        if (this.response.error.data) {
          this.toast.error(this.response.error.data.non_field_errors, 'Posting Denied!');
        } else if (this.response.status >= 500) {
          this.toast.error('Internal Server Error!', 'Posting Denied!');
        } else if (this.response.status === 0 ) {
          this.toast.error('Please check your connection!', 'Posting Denied!');
        }
      }
    );
  }
  dateFormat(date: any) {
    this.create_date =  this.dateFormatter.transform(date, 'dd-MM-yyyy');
  }
}
