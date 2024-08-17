import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizEditorQuestionComponent } from './quiz-editor-question.component';

describe('QuizEditorQuestionComponent', () => {
  let component: QuizEditorQuestionComponent;
  let fixture: ComponentFixture<QuizEditorQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuizEditorQuestionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuizEditorQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
