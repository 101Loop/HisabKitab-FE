import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {GetIncomingData} from '../../service/api-service/apicall.service';
@Component({
  selector: 'app-success-message',
  templateUrl: './success-message.component.html',
  styleUrls: ['./success-message.component.css']
})
export class SuccessMessageComponent implements OnInit {
  isShow = true;
  constructor( public dialogRef: MatDialogRef<SuccessMessageComponent>) { }

  ngOnInit() {
  }
hide() {
  const passData = new GetIncomingData();
  window.location.reload();
  this.dialogRef.close();
}
}
