import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NormalrequestComponent } from './normalrequest.component';

describe('NormalrequestComponent', () => {
  let component: NormalrequestComponent;
  let fixture: ComponentFixture<NormalrequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NormalrequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NormalrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
