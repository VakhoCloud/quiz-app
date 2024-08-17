import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { QuizService } from '../../quiz.service';
import { Question } from '../../shared/question.model';
import { Quiz } from '../../shared/quiz.model';
import { Results } from '../../shared/results.model';
import { ResultsService } from '../results.service';

@Component({
  selector: 'app-result-check',
  templateUrl: './result-check.component.html',
  styleUrls: ['./result-check.component.css']
})
export class ResultCheckComponent implements OnInit, OnDestroy {
  username: string = '';
  checkMode: boolean = false;

  id: number;
  quiz: Quiz;
  subs$: Subscription;

  result: Results;
  date: Date;
  email: string;
  
  constructor(
    private route: ActivatedRoute, 
    private quizService: QuizService,
    private resultsService: ResultsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subs$ = this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.username = params['username'];
      this.result = this.quizService.getResultById(this.id);
      if(this.result) {
        this.quiz = this.result.quiz;
      }
      this.date = this.result.date;
      this.email = this.result.email;
    });
  
  }

  containsMultipleCorrectOptions(question: Question): boolean {
    let correctCount = question.options.filter(option => option.isCorrect).length;
    return correctCount > 1;
  }

  selected(questId, oId) {
    const question = this.quiz.questions[questId];
    if (this.containsMultipleCorrectOptions(question)) {
      question.options[oId].selected = !question.options[oId].selected;
    } else {
      question.options.forEach(opt => {
        opt.selected = false;
      });
      question.options[oId].selected = !question.options[oId].selected;
    };
  }

  previous() { 
    this.resultsService.checkMode.next(false);
    this.router.navigate(['results']);
  }
 
  ngOnDestroy(): void {
    this.resultsService.checkMode.next(false);
    this.subs$.unsubscribe();
  }
}
