import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
@Component({
  selector: 'app-success-message',
  templateUrl: './success-message.component.html',
  styleUrls: ['./success-message.component.css']
})
export class SuccessMessageComponent implements OnInit {
  constructor( public dialogRef: MatDialogRef<SuccessMessageComponent>) {}
  ngOnInit() {}
hide() {
 this.ngOnInit();
  this.dialogRef.close();
}
}
