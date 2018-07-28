import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

import {ToastrService} from 'ngx-toastr';

import {SharedClass} from '../../shared-class';
import {NavbarService} from '../../service/navigation-bar/navbar.service';
import {APICallService} from '../../service/api-service/apicall.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends SharedClass implements OnInit {
  loading: boolean;
  hide = true;
  username: string;
  password: string;
  response: any;
  mail = new FormControl('', [Validators.required]);
  loginForm: FormGroup;

  constructor(public navbar: NavbarService, private http: HttpClient, private toast: ToastrService, private rtr: Router,
              private apiObject: APICallService) {
    super(rtr);
    this.navbar.hide();
    this.navbar.invisi();
    this.navbar.hideSearch();
    this.navbar.showhome();
    this.navbar.hideLogin();
  }

  ngOnInit() {
    super.ngOnInit();
    this.loading = true;
    this.loginForm = new FormGroup({
      'mail': new FormControl('', [Validators.required]),
      'password': new FormControl('', [Validators.required])
    });
   /* /!*Script for Initial Loader Screen*!/
    document.onreadystatechange = function () {
      if (document.readyState === 'loading') {
        document.getElementById('loginscreenID').style.display = 'none';
        document.getElementById('loaderId').style.display = 'block';
      } else if (document.readyState === 'complete') {
        document.getElementById('loaderId').style.display = 'none';
        document.getElementById('loginscreenID').style.display = 'block';
      }
    };*/
  }

  onClick() {
    this.loading = true;
    this.apiObject.login(this.username, this.password).subscribe(
      data => {
        window.location.reload();
        this.loading = false;
        this.response = data;
        if (this.response.status_code === 200) {
          // Save JWT Token
          localStorage.setItem(this.KEY_TOKEN, this.response.data.token);
          this.toast.success('Login successfully', 'Login');
          this.rtr.navigate(['/', 'dashboard']);
        }
      }, error => {
        this.loading = false;
        for (const mesg of error) {
          this.toast.error(mesg);
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
