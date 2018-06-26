import { Injectable } from '@angular/core';
import {SwUpdate} from '@angular/service-worker';

@Injectable({
  providedIn: 'root'
})
export class SwUpdateService {

  constructor(updates: SwUpdate) {
    updates.available.subscribe( event => {
    });
    updates.activated.subscribe(event => {});
  }
}
