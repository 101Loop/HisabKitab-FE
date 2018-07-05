import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {isBoolean} from 'util';

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
  /*----------for pass name-----------*/
  private nameSource = new BehaviorSubject<string>('');
  nameData = this.nameSource.asObservable();
  /*----------for pass amount-----------*/
  private amountSource = new BehaviorSubject<string>('');
  amountData = this.amountSource.asObservable();
  /*----------for pass comment-----------*/
  private commentSource = new BehaviorSubject<string>('');
  commentData = this.commentSource.asObservable();
  /*----------for pass post id-----------*/
  private idSource = new BehaviorSubject<string>('');
  idData = this.idSource.asObservable();
  /*---------pass filter data-----------*/
  private filterSource = new BehaviorSubject<any>('');
  filterData = this.filterSource.asObservable();
  /*---------pass boolean for delete-----------*/
  private deleteSource = new BehaviorSubject<boolean>(isBoolean(''));
  ddeleteData  = this.deleteSource.asObservable();
  constructor() { }
  /*for change title*/
  changeMessage(message: any) {
    this.messageSource.next(message);
  }
  /*----------for pass name-----------*/
  passName(message: any) {
    this.nameSource.next(message);
  }
  /*----------for pass amount-----------*/
  passAmount(message: any) {
    this.amountSource.next(message);
  }
  /*----------for pass comment-----------*/
  passComment(message: any) {
    this.commentSource.next(message);
  }
  /*----------for pass id-----------*/
  passId(message: any) {
    this.idSource.next(message);
  }
  /*----------for pass filter-----------*/
  passfilter(message: any) {
    this.filterSource.next(message);
  }
  /*---------pass boolean for delete-----------*/
  passDelete(message: any) {
    this.deleteSource.next(message);
  }
}
