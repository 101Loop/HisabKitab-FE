import { Injectable } from '@angular/core';
import {SwUpdate} from '@angular/service-worker';
import {interval} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckForUpdateService {

  constructor(updates: SwUpdate) {
    interval(12 * 60 * 60).subscribe(() => updates.checkForUpdate());
  }
}
