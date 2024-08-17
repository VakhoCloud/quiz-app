import { Injectable } from '@angular/core';
import { QuizService } from '../quiz.service';
import { Quiz } from '../shared/quiz.model';
import { Question } from '../shared/question.model';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class QuizExamService {
  quizStart = new Subject<boolean>();

  constructor(private quizService: QuizService) {
  }

  getQuiz(id){ 
   return this.quizService.getQuizById(id);
  }

  allCorrectAnswersSelected(question: Question): boolean {
    const correctOptions = question.options.filter(option => option.isCorrect);
    const selectedCorrectOptions = question.options.filter(option => option.selected);
    // console.log(question.options.filter(option => option.selected))
   
    return correctOptions.length === selectedCorrectOptions.length;
  }

  hasWrongAnswerSelected(question: Question): boolean {
    const wrongOptionsSelected = question.options.some(option => !option.isCorrect && option.selected);
    return wrongOptionsSelected;
  }


  checker(quiz: Quiz, points){
    points = 0
    quiz.questions.forEach(question => {
      const correctOptions = question.options.filter(option => option.isCorrect);
      const selectedCorrectOptions = question.options.filter(option => option.isCorrect && option.selected);
      const selectedIncorrectOptions = question.options.filter(option => !option.isCorrect && option.selected);

      if (
        correctOptions.length === selectedCorrectOptions.length &&
        selectedIncorrectOptions.length === 0 &&
        correctOptions.every(option => option.selected)
      ) {
        points++;
      }
    });
    return points
  }

}
