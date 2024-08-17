import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'questionCounter'
})
export class QuestionCounterPipe implements PipeTransform {

  transform(currentIndex: number, totalQuestions: number): number[] {
    const maxVisible = 5;
    let start = Math.max(0, Math.min(currentIndex - 2, totalQuestions - maxVisible));
    let end = Math.min(totalQuestions, start + maxVisible);
    return Array.from({length: end - start}, (_, i) => start + i + 1);
  }

}
