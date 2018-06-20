///<reference path="../../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';
import {NavbarService} from '../../service/navigation-bar/navbar.service';
import {DataService} from '../../service/data-service/data.service';
import {ApicallService} from '../../service/api-service/apicall.service';
import {SharedClass} from '../../shared-class';
import {Location} from '@angular/common';
import {LogoutDialogComponent} from '../logout-dialog/logout-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent extends SharedClass implements OnDestroy, OnInit {
  mobileQuery: MediaQueryList;
  title = 'Flexy Managers';
  private _mobileQueryListener: () => void;
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, public navbar: NavbarService,
              public dialog: MatDialog, private data: DataService, private location: Location,
              private rtr: Router, private apiObject: ApicallService) { super(apiObject, rtr);
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnInit() {
    super.ngOnInit();
    this.data.currentMessage.subscribe(message => this.title = message);
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  // contactDialog(): void {
  //   const dialogRef = this.dialog.open(ContactComponent, {
  //   });
  // }
  /*  referralDialog(): void {
      const dialogRef = this.dialog.open(ReferralStatusComponent, {
      });
    }*/
  goBack() {
    this.location.back();
  }
  onLogout() {
    const dialogRef = this.dialog.open(LogoutDialogComponent, {
      height: '150px',
      width: '250px'
    });
  }
}
