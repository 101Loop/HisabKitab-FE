import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  visible: boolean;
  isShow: boolean;
  constructor() {this.visible = true; this.isShow = true;  }
  hide() { this.visible = false; }
  show() { this.visible = true; }
  toggle() { this.visible = !this.visible; }
  visi() {this.isShow = true; }
  invisi() {this.isShow = false; }
}
