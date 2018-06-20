import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlexyJobListComponent } from './flexy-job-list.component';

describe('FlexyJobListComponent', () => {
  let component: FlexyJobListComponent;
  let fixture: ComponentFixture<FlexyJobListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlexyJobListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlexyJobListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
