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
  id = localStorage.getItem('ID');
  date: any = new Date();
  position: string;
  name: string;
  amount: string;
  modeID: any;
  comment: string;
  post_id: string;
  isEdit = false;
  isDisable = true ;
  isOpen = true;
  constructor(private rtr: Router, private navbar: NavbarService,  public dialogRef: MatDialogRef<ShowStatusComponent>,
              private apiObject: APICallService, private data: DataService, private toast: ToastrService) {
    super(rtr);
    this.navbar.show();
    this.getMode(this.apiObject);
  }
  ngOnInit() {
    super.ngOnInit();
  }
  onEdit() {
    this.isDisable = false;
    this.isEdit = true;
    this.data.nameData.subscribe(message => this.name = message);
    this.data.amountData.subscribe(message => this.amount = message);
    this.data.commentData.subscribe(message => this.comment = message);
    this.data.idData.subscribe(message  => this.id = message);
  }
  onSuccess(): void {
        this.loading = true;
        this.apiObject.updatePost(this.id, this.name, this.amount, this.comment, this.modeID).subscribe(
          data => {
            console.log(data);
            this.dialogRef.close();
          /*  this.loading = false;
            this.resp = data;
            if (this.resp.status_code === 201) {
              this.dialogRef.close();
              const dialogRef = this.dialog.open(SuccessMessageComponent, {
              });
            }*/
          }, error => {
            this.dialogRef.close();
            console.log(error);
            this.toast.error('Something Wrong Here!', 'Posting Denied!');
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
