import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
@Component({
  selector: 'app-success-message',
  templateUrl: './success-message.component.html',
  styleUrls: ['./success-message.component.css']
})
export class SuccessMessageComponent implements OnInit {
  isShow = true;
  constructor( public dialogRef: MatDialogRef<SuccessMessageComponent>) {}
  ngOnInit() {}
hide() {
  // const passData = new FetchCredit();
  window.location.reload();
  this.dialogRef.close();
}
}
