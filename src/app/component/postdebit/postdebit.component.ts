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
    super(rtr);
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
    this.getMode(this.apiObject);
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
        for (const mesg of error) {
          this.toast.error(mesg);
        }
      }
    );
  }
  /**To tranform date to this "dd-MM-yyyy" standard format**/
  dateFormat(date: any) {
    this.create_date =  this.dateFormatter.transform(date, 'yyyy-MM-dd');
  }
}
