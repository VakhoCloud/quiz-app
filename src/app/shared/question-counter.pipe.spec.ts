import { QuestionCounterPipe } from './question-counter.pipe';

describe('QuestionCounterPipe', () => {
  it('create an instance', () => {
    const pipe = new QuestionCounterPipe();
    expect(pipe).toBeTruthy();
  });
});
