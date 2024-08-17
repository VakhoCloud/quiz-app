import { Injectable } from '@angular/core';
import { Question } from './shared/question.model';
import { Option } from './shared/option.model';
import { Subject } from 'rxjs';
import { Quiz } from './shared/quiz.model';
import { FormGroup } from '@angular/forms';
import { Results } from './shared/results.model';


@Injectable({
  providedIn: 'root'
})
export class QuizService {
  quizChanged = new Subject<Quiz[]>();
  participantChanged = new Subject<Results[]>();

  // private quiz: Quiz[] = [
  //   new Quiz(
  //     0,
  //     'this is quiz title ',
  //     new QuizSettings(true, true, 5000, '', true, true ),
  //     [
  //       new Question(
  //         0,
  //         'What is the square root of 144?',
  //         [
  //           new Option(0, '10', false),
  //           new Option(1, '11', false),
  //           new Option(2, '12', true),
  //           new Option(3, '13', false),
  //           new Option(4, '14', false),
  //         ]
  //       ), 
  //       new Question(
  //         0,
  //         'What is the value of 7×6',
  //         [
  //           new Option(0, 'Donka option', true),
  //           new Option(1, '2nd option', false),
  //           new Option(2, '3rd option', false),
  //           new Option(3, '4th option', false)
  //         ]
  //       ), 
  //       new Question(
  //         0,
  //         'This is 1st question',
  //         [
  //           new Option(0, 'Donka option', true),
  //           new Option(1, '2nd option', false),
  //           new Option(2, '3rd option', false),
  //           new Option(3, '4th option', false)
  //         ]
  //       ), 
  //       new Question(
  //         0,
  //         'This is 1st question',
  //         [
  //           new Option(0, 'Donka option', true),
  //           new Option(1, '2nd option', false),
  //           new Option(2, '3rd option', false),
  //           new Option(3, '4th option', false)
  //         ]
  //       ), 
      
  //     ], 
      
  //   ),
  //   new Quiz(
  //     1,
  //     'this is quiz title',
  //     new QuizSettings(false, false, 60),
  //     [
  //       new Question(
  //         0,
  //         'This is 2nd question',
  //         [
  //           new Option(0, '1st option', true),
  //           new Option(1, '2nd option', false),
  //           new Option(2, '3rd option', false),
  //           new Option(3, '4th option', false)
  //         ]
  //       )
  //     ]
  //   ),
  // ];

  private results: Results[] = [];

  private quiz: Quiz[] = [];

  setQuizzes(quiz: Quiz[]) {
    this.quiz = quiz;
    this.quizChanged.next(this.quiz.slice());
  }

  getQuiz() {
    return this.quiz.slice();
  }

  getQuizById(id: number) {
    // return this.quiz.slice()[id];
    return this.quiz.find(q => q.id === id);
  }

  saveQuizForm(quizForm: FormGroup, editMode: boolean, id?: number) {
    
    const newId = editMode ? id : this.quiz.length;

    const formValue = quizForm.value;
    const newQuiz = new Quiz(
      newId,
      formValue.title,
      formValue.settings,
      formValue.question.map((questionData: any, index: number) => {
        return new Question(
          index,
          questionData.text,
          questionData.option.map((optionData: any, idx: number) => {
            return new Option(
              idx,
              optionData.text,
              optionData.isCorrect
            );
          })
        );
      }),
    );
    if (editMode) {
      this.quiz[newId] = newQuiz;
    } else { 
      this.quiz.push(newQuiz);
    };
    this.quizChanged.next(this.quiz.slice());
  }




  removeQuiz(id: number) {
    const index = this.quiz.findIndex(quiz => quiz.id === id);
    if (index !== -1) {
      this.quiz.splice(index, 1);
      this.quiz.map((q, index) => {
        q.id = index;
      });
    }
    this.quizChanged.next(this.quiz.slice());
  }


  onSaveParticipation(id: number, uname: string, qName: string, point: number, totalPoints: number, quiz: Quiz, string: string, email: string) {
    this.results.push(
      new Results (      
        id,
        uname,
        qName,
        point,
        totalPoints,
        new Date(),
        quiz,
        string,
        email
      )
    )
    this.participantChanged.next(this.results.slice());
  }

  setResults(results) {
    this.results = results;
    this.participantChanged.next(this.results.slice());
  }

  getResults(){
    return this.results.slice();
  }

  getResultById(id: number){ 
    return this.results.slice()[id];
  }
}
