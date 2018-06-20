import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlexyrequestComponent } from './flexyrequest.component';

describe('FlexyrequestComponent', () => {
  let component: FlexyrequestComponent;
  let fixture: ComponentFixture<FlexyrequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlexyrequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlexyrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
