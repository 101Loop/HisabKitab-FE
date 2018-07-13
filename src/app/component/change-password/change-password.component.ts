import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SharedClass} from '../../shared-class';
import {APICallService} from '../../service/api-service/apicall.service';

 @Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent extends SharedClass implements OnInit {
  hide = true;
  title = 'Change Password';
  new_pass: string;
  confirm_pass: string;
  changePassword: FormGroup;
  constructor(private rtr: Router, private toast: ToastrService, public location: Location, private apiObject: APICallService) {
    super(rtr);
  }
  ngOnInit() {
    super.ngOnInit();
    this.changePassword = new FormGroup({
      'new': new FormControl('', [Validators.required]),
      'confirm': new FormControl('', [Validators.required])
    });
  }
  onUpdate() {
    if (this.new_pass === this.confirm_pass) {
      this.apiObject.changePassword(this.new_pass).subscribe(
        data => {
          this.toast.success('Password changed successfully', 'Change Password');
          this.location.back();
        }, error => {
          for (const mesg of error) {
            this.toast.error(mesg);
          }
        }
      );
    } else {
      this.toast.error('Password does not match', 'Change Password');
    }
  }
}
