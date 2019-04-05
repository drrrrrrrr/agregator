import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSaveArticleComponent } from './user-save-article.component';

describe('UserSaveArticleComponent', () => {
  let component: UserSaveArticleComponent;
  let fixture: ComponentFixture<UserSaveArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSaveArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSaveArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
