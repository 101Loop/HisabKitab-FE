import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewspageComponent } from './newspage.component';

describe('NewspageComponent', () => {
  let component: NewspageComponent;
  let fixture: ComponentFixture<NewspageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewspageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewspageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
