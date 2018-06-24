import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

import {ToastrService} from 'ngx-toastr';

import {SharedClass} from '../../shared-class';
import {NavbarService} from '../../service/navigation-bar/navbar.service';
import {DataService} from '../../service/data-service/data.service';
import {APICallService} from '../../service/api-service/apicall.service';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent extends SharedClass implements OnInit {
  loading: boolean;
  userInput: string;
  response: any;
  mail = new FormControl('', [Validators.required, Validators.email]);
  forgetForm: FormGroup;
  constructor(private location: Location, public navbar: NavbarService, private data: DataService, private http: HttpClient,
              private toast: ToastrService, private rtr: Router, private apiObject: APICallService) {
    super(apiObject, rtr);
    this.navbar.hide();
    this.navbar.visi();
  }

  ngOnInit() {
    super.ngOnInit();
    this.forgetForm = new FormGroup({
      'email' : new FormControl('', Validators.required)
    });
  }
  getOtp() {
    this.loading = true;
    this.data.changeMessage(this.userInput);
    this.apiObject.loginwithOTP(this.userInput).subscribe(
      data => {
        this.loading = false;
        this.response = data;
        this.toast.success('OTP has been sent successfully', 'Forget Password');
        // TODO: Implement Promise returned by navigate
        this.rtr.navigate(['/', 'otpverification']);
      }, error => {
        this.loading = false;
        this.response = error;
        console.log(this.response);
        if (this.response.error.data) {
          this.toast.error(this.response.error.data.message, 'Forget Password');
        } else if (this.response.status === 0) { this.toast.error('Please check your internet connection!', 'Login Denied!');
        } else if (this.response.status >= 500) {this.toast.error('Internal Server Error', 'Login Denied'); }
      }
    );
  }
  getMailError() {
    return this.mail.hasError('required') ? 'You must enter a valid email' :
      this.mail.hasError('mail') ? 'Not a valid email' : '';
  }
}
/*, error => {
  this.toast.error('Something went wrong, Please try again', 'Forget Password');
}*/
