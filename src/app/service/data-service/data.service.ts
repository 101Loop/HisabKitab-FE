import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  /*for change title*/
  private messageSource = new BehaviorSubject<string>('Hisab Kitab');
  currentMessage = this.messageSource.asObservable();
  /* for passing data*/
  private dataSource = new BehaviorSubject<string>('Hisab Kitab');
  currentData = this.dataSource.asObservable();
  constructor() { }
  /*for change title*/
  changeMessage(message: string) {
    this.messageSource.next(message);
  }
}
