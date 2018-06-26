import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';

import {ToastrService} from 'ngx-toastr';

import {SharedClass} from '../../shared-class';
import {SuccessMessageComponent} from '../success-message/success-message.component';
import {APICallService} from '../../service/api-service/apicall.service';

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
  amount: number;
  modeID: number;
  response: any;
  list: any;
  category = 'D';
  normalForm: FormGroup;
  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<PostdebitComponent>, private toast: ToastrService,
              private rtr: Router, private apiObject: APICallService, private dateFormatter: DatePipe) {
    super(apiObject, rtr);
    this.dateFormat(this.date);
    this.list = this.mode_api_results;
  }
  ngOnInit() {
    super.ngOnInit();
    this.normalForm = new FormGroup({
      'contactname': new FormControl('', [Validators.required]),
      'amount': new FormControl('', [Validators.required, Validators.pattern('(\\d+(\\.\\d+)?)')]),
      'date': new FormControl('', [Validators.required]),
      'desc': new FormControl('', )
    });
    this.getMode();
  }

  onSuccess(): void {
    this.loading = true;
    this.apiObject.addTransactions(this.contact, this.modeID, this.amount, this.category, this.create_date).subscribe(
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
  /**To tranform date to this "dd-MM-yyyy" standard format**/
  dateFormat(date: any) {
    this.create_date =  this.dateFormatter.transform(date, 'dd-MM-yyyy');
  }
}
