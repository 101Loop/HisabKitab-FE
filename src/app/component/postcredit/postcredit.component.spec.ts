import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostcreditComponent } from './postcredit.component';

describe('PostcreditComponent', () => {
  let component: PostcreditComponent;
  let fixture: ComponentFixture<PostcreditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostcreditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostcreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
