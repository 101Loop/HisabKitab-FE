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
  comments: string;
  response: any;
  modeID: number;
  hisabkitabForm: FormGroup;
  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<PostcreditComponent>, private apiObject: APICallService,
              private toast: ToastrService, private rtr: Router, private dateFormatter: DatePipe) {
    super(rtr);
    this.dateFormat(this.date);
  }
  ngOnInit() {
    super.ngOnInit();
    this.hisabkitabForm = new FormGroup({
      'contactname' : new FormControl('', [Validators.required]),
      'amount' : new FormControl('', [Validators.required, Validators.pattern('(\\d+(\\.\\d+)?)')]),
      'date' : new FormControl('', [Validators.required]),
      'comments' : new FormControl('', ),
      'radio': new FormControl('', [Validators.required])
    });
    this.getMode(this.apiObject);
  }
  onSuccess(): void {
    this.loading = true;
    // post data to server
    this.apiObject.addTransactions(this.contact, this.modeID, this.amount, this.category, this.comments, this.create_date).subscribe(
      data => {
        this.loading = false;
        this.response = data;
          this.dialogRef.close();
          this.dialog.open(SuccessMessageComponent, {
          });
      }, error => {
        this.loading = false;
        for (const mesg of error) {
          if (error[0] === 'You are not logged in or the token has expired. Please login again!') {
            this.rtr.navigate(['/', 'home']);
            localStorage.clear();
          }
          this.toast.error(mesg);
        }
      }
    );
  }
  /**To tranform date to this "yyyy-MM-dd" standard format**/
  dateFormat(date: any) {
    this.create_date =  this.dateFormatter.transform(date, 'yyyy-MM-dd');
  }
}
