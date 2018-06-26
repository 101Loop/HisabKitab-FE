import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
// import {MatDialog} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

import {ToastrService} from 'ngx-toastr';

import {SharedClass} from '../../shared-class';
import {NavbarService} from '../../service/navigation-bar/navbar.service';
import {APICallService} from '../../service/api-service/apicall.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent extends SharedClass implements OnInit {
  loading: boolean;
  hide = true;
  signupForm: FormGroup;
  name: string;
  userEmail: string;
  userContact: string;
  userPassword: string;
  confirmPassword: string;
  resp: any;
  constructor(public location: Location, public navbar: NavbarService, private http: HttpClient, private rtr: Router,
              private apiObject: APICallService, private toast: ToastrService) {
    // public dialog: MatDialog
    super(apiObject, rtr);
    this.navbar.hide();
    this.navbar.visi();
  }
  onSuccess(): void {
    if (this.userPassword === this.confirmPassword) {
    this.loading = true;
    this.apiObject.register(this.name, this.userEmail, this.userPassword, this.userContact).subscribe(
      data => {
        this.loading = false;
        this.resp = data;
        if (this.resp.status_code === 201) {
          this.toast.success('Registration Successful', 'Registration');
          this.rtr.navigate(['/', 'login']);
        } else {
          this.toast.error('There is some problem, Please try again', 'Registration Denied!');
        }
      }, error => {
        this.loading = false;
        this.resp = error;
        if (this.resp.error.data) {
          if (this.resp.error.data.email) {
            this.toast.error(this.resp.error.data.email, 'Registration Denied!');
          } if (this.resp.error.data.username) {
            this.toast.error(this.resp.error.data.username, 'Registration Denied!');
          }
        } else if (this.resp.status === 0) {
          this.toast.error('Please check your internet connection!', 'Registration Denied!');
        } else if (this.resp.status >= 500) {
          this.toast.error('Internal Server Error!', 'Registration Denied');
        }
      }
    );
    /* const dialogRef = this.dialog.open(SuccessMessageComponent, {
    });*/
    } else {
      this.toast.error('Password does not match', 'Registration Denied!');
    }
  }
  ngOnInit() {
    super.ngOnInit();
    this.signupForm = new FormGroup({
      'name': new FormControl('', Validators.required),
      'email' : new FormControl('', [Validators.required, Validators.email,
        Validators.pattern( '([A-Za-z0-9_\\-\\.])+\\@([A-Za-z0-9_\\-\\.])+\\.([A-Za-z]{2,4})$')]),
      'contact': new FormControl('', [Validators.required]),
      'password' : new FormControl('', [Validators.required]),
    });
  }
}
