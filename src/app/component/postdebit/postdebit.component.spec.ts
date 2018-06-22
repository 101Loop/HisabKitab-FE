import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostdebitComponent } from './postdebit.component';

describe('PostdebitComponent', () => {
  let component: PostdebitComponent;
  let fixture: ComponentFixture<PostdebitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostdebitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostdebitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
