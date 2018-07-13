import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {SharedClass} from '../../shared-class';
import {DataService} from '../../service/data-service/data.service';
import {NavbarService} from '../../service/navigation-bar/navbar.service';
import {Location} from '@angular/common';
import {APICallService} from '../../service/api-service/apicall.service';

 @Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent extends SharedClass implements OnInit {
  title = 'My Profile';
  constructor(private rtr: Router, private data: DataService, private navbar: NavbarService, private toast: ToastrService,
              public location: Location, private apiObject: APICallService) {
    super(rtr);
    this.data.changeMessage(this.title);
    this.navbar.invisi();
  }

  ngOnInit() {
    super.ngOnInit();
    /* To check if user is logged in or logged out, if logout then it will redirect user to login page */
   // if (!this.KEY_TOKEN) { this.rtr.navigate(['/', 'login']); }
  }
  onUpdate() {
    this.apiObject.updateProfile(this.s_name, this.s_mobile, this.s_email).subscribe(
      data => {
        this.toast.success('Your profile updated successfully', 'Profile');
      }, error => {
        for (const mesg of error) {
          this.toast.error(mesg);
        }
      }
    );
  }
}
