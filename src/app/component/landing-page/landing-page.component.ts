import { Component, OnInit } from '@angular/core';
import {NavbarService} from '../../service/navigation-bar/navbar.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor(private navbar: NavbarService) {
    this.navbar.hide();
    this.navbar.invisi();
    this.navbar.hideSearch();
    this.navbar.hideHome();
    this.navbar.showLogin();
    this.navbar.showDash();
  }
  ngOnInit() {
  }

}
