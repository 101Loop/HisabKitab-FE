import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {SharedClass} from '../../shared-class';
import {NavbarService} from '../../service/navigation-bar/navbar.service';
import {ApicallService, Login} from '../../service/api-service/apicall.service';

 @Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends SharedClass implements OnInit {
  loading: boolean;
  hide = true;
  userName: string;
  password: string;
  token: string;
  response: any;
  status: any;
  mail = new FormControl('', [Validators.required]);
  loginForm: FormGroup;

  constructor(public navbar: NavbarService, private http: HttpClient, private toast: ToastrService,
              private rtr: Router, private apiObject: ApicallService) {
    super(apiObject, rtr);
    this.navbar.hide();
    this.navbar.invisi();
  }
  ngOnInit() {
    super.ngOnInit();
    this.loginForm = new FormGroup({
      'mail' : new FormControl('', [Validators.required]),
      'password' : new FormControl('', [Validators.required])
    });
  }
  onClick() {
    // this.rtr.navigate(['/', 'newspage']);
    this.loading = true;
    const passData = new Login(this.userName, this.password);
    this.apiObject.login(passData).subscribe(
      data => {
        this.loading = false;
        this.response = data;
        this.status = this.response.status_code;
        if (this.status === 200) {
          this.token = this.response.data.token;
          // Save JWT Token
          localStorage.setItem(this.KEY_TOKEN, this.token);
           this.toast.success('Login successfully', 'Login');
          this.rtr.navigate(['/', 'dashboard']);
          // console.log(this.referral);
          window.location.reload();
        }
      }, error => {
        this.loading = false;
        this.response = error;
        console.log('Error:' + this.response.status);
        if (this.response.error.data) {
          this.toast.error(this.response.error.data.non_field_errors, 'Login Denied!');
        } else if (this.response.status >= 500) {
          this.toast.error('Server Error!', 'Login Denied!');
        } else if (this.response.status === 0) {
          this.toast.error('Please check your Internet Connection!', 'Login Denied!');
        }
      }
    );
  }
  getMailError() {
    return this.mail.hasError('required') ? 'This field is required' :
      this.mail.hasError('mail') ? 'Not a valid email' :
        '';
  }
  getPasswordError() {
    return this.mail.hasError('required') ? 'Enter valid password' :
      this.mail.hasError('mail') ? 'Not a valid password' :
        '';
  }
}
