import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowStatusComponent } from './show-status.component';

describe('ShowStatusComponent', () => {
  let component: ShowStatusComponent;
  let fixture: ComponentFixture<ShowStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
