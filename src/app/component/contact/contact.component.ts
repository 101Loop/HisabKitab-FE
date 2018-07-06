import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {SharedClass} from '../../shared-class';
import {APICallService} from '../../service/api-service/apicall.service';

 @Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent extends SharedClass implements OnInit {
contact_email = 'info@flexymanagers.com';
contact_mobile = '+91 1141096555';
isAssign: boolean;
  constructor(private toast: ToastrService, private rtr: Router, private apiObject: APICallService) {
    super(rtr);
  }

  ngOnInit() {
    super.ngOnInit();
  //   if (this.assigned_to) {
  //  this.isAssign = true;
  //   }
  }
  onClick() {
    this.toast.success('hellooo');
    const a = 'Hello';
}
}
