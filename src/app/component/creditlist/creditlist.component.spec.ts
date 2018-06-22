import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditlistComponent } from './creditlist.component';

describe('CreditlistComponent', () => {
  let component: CreditlistComponent;
  let fixture: ComponentFixture<CreditlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
