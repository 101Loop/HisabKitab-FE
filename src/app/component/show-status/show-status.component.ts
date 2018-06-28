import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {APICallService} from '../../service/api-service/apicall.service';
import {Router} from '@angular/router';
import {NavbarService} from '../../service/navigation-bar/navbar.service';
import {ToastrService} from 'ngx-toastr';
import {SharedClass} from '../../shared-class';
import {PostcreditComponent} from '../postcredit/postcredit.component';

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
  gender: string;
  salary: string;
  time: string;
  desc: string;
  post_id: string;
  organization: string;
  resp: any;
  isEdit = false;
  isDisable = true ;
  isOpen = true;
  constructor(private rtr: Router, private navbar: NavbarService,  public dialogRef: MatDialogRef<ShowStatusComponent>) {
    super(rtr);
    this.navbar.show();
  }
  ngOnInit() {
    super.ngOnInit();
  }
  onEdit() {
    this.isDisable = false;
    this.isEdit = true;
  }
  onSuccess(): void {
    /*    this.loading = true;
        const passData = new UpdateFlexyPost(this.id, this.date, this.position, this.salary, this.gender,
          this.time, this.desc, this.post_id, this.organization);
        this.postObject.updatePostFlexy(passData).subscribe(
          data => {
            this.loading = false;
            this.resp = data;
            if (this.resp.status_code === 201) {
              this.dialogRef.close();
              const dialogRef = this.dialog.open(SuccessMessageComponent, {
              });
            }
          }, error => {
            this.loading = false;
            this.resp = error;
            if (this.resp.error) {
              this.toast.error('Please try again', 'Posting Denied!');
            } else {
              this.toast.error('Please check your internet connection!', 'Posting Denied!');
            }
          }
        );*/
  }
}
