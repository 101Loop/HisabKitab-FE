import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';

import {ToastrService} from 'ngx-toastr';

import {SharedClass} from '../../shared-class';
import {APICallService} from '../../service/api-service/apicall.service';
import {SuccessMessageComponent} from '../success-message/success-message.component';

@Component({
  selector: 'app-hisabkitabrequest',
  templateUrl: './postcredit.component.html',
  styleUrls: ['./postcredit.component.css'],
  providers: [DatePipe]
})
export class PostcreditComponent extends SharedClass implements OnInit {
  loading: boolean;
  message: string;
  date: any = new Date();
  create_date: any;
  contact: string;
  amount: number;
  category = 'C';
  response: any;
  modeID: number;
  hisabkitabForm: FormGroup;
  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<PostcreditComponent>, private apiObject: APICallService,
              private toast: ToastrService, private rtr: Router, private dateFormatter: DatePipe) {
    super(apiObject, rtr);
    this.dateFormat(this.date);
  }
  ngOnInit() {
    super.ngOnInit();
    this.hisabkitabForm = new FormGroup({
      'contactname' : new FormControl('', [Validators.required]),
      'amount' : new FormControl('', [Validators.required, Validators.pattern('(\\d+(\\.\\d+)?)')]),
      'date' : new FormControl('', [Validators.required])
    });
    this.getMode();
  }
  onSuccess(): void {
    this.loading = true;
    // post data to server
    this.apiObject.addTransactions(this.contact, this.modeID, this.amount, this.category, this.create_date).subscribe(
      data => {
        this.loading = false;
        this.response = data;
          this.dialogRef.close();
          this.dialog.open(SuccessMessageComponent, {
          });
      }, error => {
        this.loading = false;
        this.response = error;
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
    this.create_date =  this.dateFormatter.transform(date, 'dd/MM/yyyy');
  }
}
