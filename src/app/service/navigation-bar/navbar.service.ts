import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  visible: boolean;
  isShow: boolean;
  isSearch = false;
  isLogin: boolean;
  isHome: boolean;
  constructor() {this.visible = true; this.isShow = true;  }
  hide() { this.visible = false; }
  show() { this.visible = true; }
  toggle() { this.visible = !this.visible; }
  visi() {this.isShow = true; }
  invisi() {this.isShow = false; }
  hideSearch() { this.isSearch = false; }
  showSearch() { this.isSearch = true; }
  hideLogin() { this.isLogin = false; }
  showLogin() { this.isLogin = true; }
  hideHome() { this.isHome = false; }
  showhome() { this.isHome = true; }
}
