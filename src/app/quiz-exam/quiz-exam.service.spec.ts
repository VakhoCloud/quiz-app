import { TestBed } from '@angular/core/testing';

import { QuizExamService } from './quiz-exam.service';

describe('QuizExamService', () => {
  let service: QuizExamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizExamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
