import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {APICallService} from '../../service/api-service/apicall.service';
import {Router} from '@angular/router';
import {NavbarService} from '../../service/navigation-bar/navbar.service';
import {ToastrService} from 'ngx-toastr';
import {SharedClass} from '../../shared-class';
import {PostcreditComponent} from '../postcredit/postcredit.component';
import {DataService} from '../../service/data-service/data.service';
import {SuccessMessageComponent} from '../success-message/success-message.component';
import {DatePipe} from '@angular/common';
import {FormControl, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-show-status',
  templateUrl: './show-status.component.html',
  styleUrls: ['./show-status.component.css'],
  providers: [DatePipe]
})
export class ShowStatusComponent extends SharedClass implements OnInit {
  loading: boolean;
  id: string;
  date: any = new Date();
  position: string;
  name: string;
  amount: string;
  modeID: any;
  comment: string;
  transaction_date: any;
  PaymentModeId: string;
  post_id: string;
  isEditView = false;
  isViewOnly = true;
  isOpen = true;
  PMode: string;
  editForm: FormGroup;
  constructor(private rtr: Router, private navbar: NavbarService,  public dialogRef: MatDialogRef<ShowStatusComponent>,
              private apiObject: APICallService, private data: DataService, private toast: ToastrService, public dialog: MatDialog,
              private dateFormatter: DatePipe) {
    super(rtr);
    this.navbar.show();
    this.getMode(this.apiObject);
  }
  ngOnInit() {
    super.ngOnInit();
    this.editForm = new FormGroup({
      'name' : new FormControl('', ),
      'amount' : new FormControl('', ),
      'transaction_date' : new FormControl('', ),
      'comment' : new FormControl('', )
    });
    /*Fetching selected transaction details from dataservice.ts file*/
    this.data.nameData.subscribe(message => this.name = message);
    this.data.amountData.subscribe(message => this.amount = message);
    this.data.commentData.subscribe(message => this.comment = message);
    this.data.idData.subscribe(message  => this.id = message);
    this.data.PaymentModeData.subscribe(message => this.PaymentModeId = message);
  }
  onEdit() {
    this.isEditView = true;
    this.isViewOnly = false;
    // this.data.nameData.subscribe(message => this.name = message);
    // this.data.amountData.subscribe(message => this.amount = message);
    // this.data.commentData.subscribe(message => this.comment = message);
    // this.data.idData.subscribe(message  => this.id = message);
    // this.data.PaymentModeData.subscribe(message => this.PaymentModeId = message);
  //  console.log(('hi:' + this.PaymentModeId));
  }
  onSuccess(): void {
        this.loading = true;
        if (this.PaymentModeId === 'Cash') {
          this.PMode = '1';
        } else if (this.PaymentModeId === 'Cheque') {
          this.PMode = '2';
        } else if (this.PaymentModeId === 'Account') {
          this.PMode = '3';
        } else if (this.PaymentModeId === 'Card') {
          this.PMode = '4';
        }
    this.apiObject.updatePost(this.id, this.name, this.amount, this.comment, this.transaction_date, this.PMode).subscribe(
          data => {
            this.dialog.open(SuccessMessageComponent, {});
            // this.toast.success('Transaction has beed updated', 'Update');
            this.dialogRef.close();
            this.loading = false;
          /*
            this.resp = data;
            if (this.resp.status_code === 201) {
              this.dialogRef.close();
              const dialogRef = this.dialog.open(SuccessMessageComponent, {
              });
            }*/
          }, error => {
            this.dialogRef.close();
            this.toast.error('Something went wrong here!', 'Posting Denied!');
          /*  this.loading = false;
            this.resp = error;
            if (this.resp.error) {
              this.toast.error('Please try again', 'Posting Denied!');
            } else {
              this.toast.error('Please check your internet connection!', 'Posting Denied!');
            }*/
          }
        );
  }
  dateFormat(date: any) {
    this.date =  this.dateFormatter.transform(date, 'YYYY-MM-DD');
  }
}
