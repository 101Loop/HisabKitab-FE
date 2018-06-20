import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NormalJobListComponent } from './normal-job-list.component';

describe('NormalJobListComponent', () => {
  let component: NormalJobListComponent;
  let fixture: ComponentFixture<NormalJobListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NormalJobListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NormalJobListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
