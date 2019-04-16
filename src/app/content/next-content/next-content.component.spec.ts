import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NextContentComponent } from './next-content.component';

describe('NextContentComponent', () => {
  let component: NextContentComponent;
  let fixture: ComponentFixture<NextContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NextContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NextContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
