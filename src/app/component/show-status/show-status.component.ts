import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {APICallService} from '../../service/api-service/apicall.service';
import {Router} from '@angular/router';
import {NavbarService} from '../../service/navigation-bar/navbar.service';
import {ToastrService} from 'ngx-toastr';
import {SharedClass} from '../../shared-class';
import {PostcreditComponent} from '../postcredit/postcredit.component';
import {DataService} from '../../service/data-service/data.service';

@Component({
  selector: 'app-show-status',
  templateUrl: './show-status.component.html',
  styleUrls: ['./show-status.component.css']
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
  PaymentModeId: string;
  post_id: string;
  isEditView = false;
  isViewOnly = true;
  isOpen = true;
  PMode: string;
  constructor(private rtr: Router, private navbar: NavbarService,  public dialogRef: MatDialogRef<ShowStatusComponent>,
              private apiObject: APICallService, private data: DataService, private toast: ToastrService) {
    super(rtr);
    this.navbar.show();
    this.getMode(this.apiObject);
  }
  ngOnInit() {
    super.ngOnInit();
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
        } else if (this.PaymentModeId === 'Account') {
          this.PMode = '3';
        } else if (this.PaymentModeId === 'Cheque') {
          this.PMode = '2';
        } else if (this.PaymentModeId === 'Card') {
          this.PMode = '4';
        }

    this.apiObject.updatePost(this.id, this.name, this.amount, this.comment, this.PMode).subscribe(
          data => {
            this.toast.success('Transaction has beed updated', 'Update');
            window.location.reload();
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
}
