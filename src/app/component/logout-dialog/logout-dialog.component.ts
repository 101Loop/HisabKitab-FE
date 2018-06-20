import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MatDialogRef} from '@angular/material';
import {SharedClass} from '../../shared-class';
import {ApicallService} from '../../service/api-service/apicall.service';

@Component({
  selector: 'app-logout-dialog',
  templateUrl: './logout-dialog.component.html',
  styleUrls: ['./logout-dialog.component.css']
})
export class LogoutDialogComponent extends SharedClass implements OnInit {

  constructor( private rtr: Router, private apiObject: ApicallService,
               public dialogRef: MatDialogRef<LogoutDialogComponent>) {super(apiObject, rtr); }

  ngOnInit() {
  }
onNo() {
  this.dialogRef.close();
}
onYes() {
  this.rtr.navigate(['/', 'login']);
   localStorage.clear();
  this.dialogRef.close();
}
}
