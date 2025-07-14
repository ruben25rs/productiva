import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerSurveyComponent } from './answer-survey.component';

describe('AnswerSurveyComponent', () => {
  let component: AnswerSurveyComponent;
  let fixture: ComponentFixture<AnswerSurveyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnswerSurveyComponent]
    });
    fixture = TestBed.createComponent(AnswerSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
