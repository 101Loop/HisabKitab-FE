import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {SharedClass} from '../../shared-class';
import {AddIncoming, ApicallService} from '../../service/api-service/apicall.service';
import {SuccessMessageComponent} from '../success-message/success-message.component';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-flexyrequest',
  templateUrl: './flexyrequest.component.html',
  styleUrls: ['./flexyrequest.component.css'],
  providers: [DatePipe]
})
export class FlexyrequestComponent extends SharedClass implements OnInit {
  loading: boolean;
  message: string;
  date: any = new Date();
  create_date: any;
  name: string;
  amount: string;
  category = '+';
  selectedMode: string;
  response: any;
  boxmode: string;
  modes = [
    {value: '1', viewValue: 'Cash'},
    {value: '2', viewValue: 'Cheque'},
    {value: '3', viewValue: 'Online'},
  ];
  flexyForm: FormGroup;
  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<FlexyrequestComponent>, private flexyObject: ApicallService,
              private toast: ToastrService, private rtr: Router, private apiObject: ApicallService,
              private dateFormatter: DatePipe) { super(apiObject, rtr);
  this.dateFormat(this.date); }
  ngOnInit() {
    super.ngOnInit();
    this.flexyForm = new FormGroup({
      'position' : new FormControl('', [Validators.required]),
      'org' : new FormControl('', [Validators.required]),
      'salary' : new FormControl('', [Validators.required]),
      'desc' : new FormControl('', ),
    });
  }
  /**Passing check box modes**/
  checkBoxData(m: any) {
    this.boxmode = m.mode;
  }
  onSuccess(): void {
    this.loading = true;
    const passData = new AddIncoming(this.create_date, this.name, this.amount, this.selectedMode, this.category);
    // post data to server
    this.flexyObject.postIncoming(passData).subscribe(
      data => {
        this.loading = false;
        this.response = data;
        console.log(data);
          // this.toast.success('Post successfully posted', 'Posting');
          this.dialogRef.close();
          const dialogRef = this.dialog.open(SuccessMessageComponent, {
          });
      }, error => {
        this.loading = false;
        this.response = error;
        console.log(this.response);
        if (this.response.error.data) {
          this.toast.error(this.response.error.data.non_field_errors, 'Posting Denied!');
        } else {
          this.toast.error('Please check your internet connection!', 'Posting Denied!');
        }
      }
    );
  }
  dateFormat(date: any) {
    this.create_date =  this.dateFormatter.transform(date, 'dd-MM-yyyy');
  }
}
