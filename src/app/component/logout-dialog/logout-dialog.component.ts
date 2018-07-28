import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MatDialogRef} from '@angular/material';

import {SharedClass} from '../../shared-class';
import {APICallService} from '../../service/api-service/apicall.service';
import {DataService} from '../../service/data-service/data.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-logout-dialog',
  templateUrl: './logout-dialog.component.html',
  styleUrls: ['./logout-dialog.component.css']
})
export class LogoutDialogComponent extends SharedClass implements OnInit {
  post_id: string;
  isDelete = false;
  constructor(private rtr: Router, private apiObject: APICallService, public dialogRef: MatDialogRef<LogoutDialogComponent>,
              private data: DataService, private toast: ToastrService) {
    super(rtr);
  }

  ngOnInit() {
    this.data.ddeleteData.subscribe(message => this.isDelete = message);
    this.data.idData.subscribe(message => this.post_id  = message);
  }
  onYes() {
    if (this.isDelete) {
      this.apiObject.deletePost(this.post_id).subscribe(
        data => {
          // console.log(data);
          this.dialogRef.close();
          this.toast.error('Your Transaction has been deleted.', 'Deleting Transaction!');
          window.location.reload();
        }, error => {
          this.dialogRef.close();
          for (const mesg of error) {
            this.toast.error(mesg);
          }
        }
      );
    } else {
      // TODO: Implement Promise function of navigate
      this.rtr.navigate(['/', 'home']);
      localStorage.clear();
      this.dialogRef.close();
    }
  }
  onNO() {
    this.dialogRef.close();
  }
}
