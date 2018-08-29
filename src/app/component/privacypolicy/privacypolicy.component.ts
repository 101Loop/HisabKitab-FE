import { Component, OnInit } from '@angular/core';
import {NavbarService} from '../../service/navigation-bar/navbar.service';

@Component({
  selector: 'app-privacypolicy',
  templateUrl: './privacypolicy.component.html',
  styleUrls: ['./privacypolicy.component.css']
})
export class PrivacypolicyComponent implements OnInit {

  constructor(public navbar: NavbarService) {
    this.navbar.invisi();
    this.navbar.hide();
    this.navbar.showhome();
  }

  ngOnInit() {
  }

}
