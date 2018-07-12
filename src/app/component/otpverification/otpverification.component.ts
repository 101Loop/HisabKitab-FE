
import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

import {ToastrService} from 'ngx-toastr';

import {SharedClass} from '../../shared-class';
import {NavbarService} from '../../service/navigation-bar/navbar.service';
import {DataService} from '../../service/data-service/data.service';
import {APICallService} from '../../service/api-service/apicall.service';

@Component({
  selector: 'app-otpverification',
  templateUrl: './otpverification.component.html',
  styleUrls: ['./otpverification.component.css']
})
export class OtpverificationComponent extends SharedClass implements OnInit {
  loading: boolean;
  output: string;
  otp: string;
  response: any;
  constructor(private location: Location, public navbar: NavbarService, private toast: ToastrService, private data: DataService,
              private http: HttpClient, private rtr: Router, private apiObject: APICallService) {
    super(rtr);
    this.navbar.hide();
    this.navbar.visi(); }

  ngOnInit() {
    super.ngOnInit();
    this.data.currentMessage.subscribe(message => this.output = message);
  }
  verifyOtp () {
    this.loading = true;
    this.apiObject.loginwithOTP(this.output, this.otp).subscribe(
      data => {
        this.loading = false;
        this.response = data;
        if (this.response.status_code === 200) {
          localStorage.setItem(this.KEY_TOKEN, this.response.data.token);
          this.toast.success('Login successfully', 'Login');
          // TODO: Implement Promise returned by navigate
          this.rtr.navigate(['/', 'dashboard']);
        }
      }, error => {
        // console.log(error);
        this.loading = false;
        for (const mesg of error) {
          this.toast.error(mesg);
        }
      }
    );
  }
}
