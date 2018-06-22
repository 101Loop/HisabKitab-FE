import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebitlistComponent } from './debitlist.component';

describe('DebitlistComponent', () => {
  let component: DebitlistComponent;
  let fixture: ComponentFixture<DebitlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebitlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebitlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
