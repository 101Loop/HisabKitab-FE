import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {APICallService} from '../../service/api-service/apicall.service';
import {SharedClass} from '../../shared-class';
import {Router} from '@angular/router';
import {MatDialogRef} from '@angular/material';
import {PostcreditComponent} from '../postcredit/postcredit.component';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent extends SharedClass implements OnInit {
  feedForm: FormGroup;
  feeded_name = this.s_name;
  feeder_contact =  this.s_mobile;
  feeder_mail = this.s_email;
  feeder_feeds: string;
  constructor( private apiObject: APICallService, private rtr: Router, public dialogRef: MatDialogRef<FeedbackComponent>,
               private toast: ToastrService) { super(rtr); }

  ngOnInit() {
    super.ngOnInit();
    this.feedForm = new FormGroup({
      'name': new FormControl('', ),
      'email' : new FormControl('', ),
      'contact': new FormControl('', ),
      'feeds' : new FormControl('', ),
    });
  }
  onSubmit() {
    console.log(this.feeded_name);
    this.apiObject.sendFeed(this.s_name, this.s_mobile, this.s_email, this.feeder_feeds).subscribe(
      data => {
        console.log(data);
        this.dialogRef.close();
        this.toast.success(' Thank you for your feedback :)', 'Feedback');
      }
    );
  }
}
