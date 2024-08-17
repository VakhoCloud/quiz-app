import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Quiz } from '../shared/quiz.model';
import { QuizExamService } from './quiz-exam.service';
import { Question } from '../shared/question.model';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuizService } from '../quiz.service';
import { DataStorageService } from '../shared/data-storage.service';
import { FullscreenService } from './fullscreen.service';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-quiz-exam',
  templateUrl: './quiz-exam.component.html',
  styleUrl: './quiz-exam.component.css',
})
export class QuizExamComponent implements OnInit, OnDestroy {
  
  id: number;
  username: string = '';

  quiz: Quiz;
  subs$: Subscription;
  clickedSub$: Subscription;

  currentQuestionIndex: number = 0;
  totalPoints: number = 0;
  quizCompleted: boolean = false;
  
  // timer 
  timer: number;
  intervalId: any;
  quizStarted = false;
  qsReminder = 0;

  sec: any = '0' + 0;
  min: any = '0' + 0;
  hr: any = '0' + 0;


  // backgound image
  bgImageUrl: string;

  mode: ProgressSpinnerMode = 'determinate';
  value = 0; 

  intervalAdvance: any; 

  // stepper
  isLinear = false;
  
  constructor(
    private route: ActivatedRoute, 
    private examService: QuizExamService,
    private _snackbar: MatSnackBar,
    private quizService: QuizService,
    private dataStorageService: DataStorageService,
    private fullscreenService: FullscreenService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.dataStorageService.fetchQuizzes().subscribe(res => {
      this.subs$ = this.route.params.subscribe((params: Params) => {
        this.id = +params['id'];
        this.quiz = this.examService.getQuiz(this.id);
        console.log(this.id);
      });

      if(!this.quiz.settings.strictMode) { 
        this.startTimer();
      }

      if(this.quiz.settings.strictMode) {
        document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));
      }
    });

  }


    // timer 
  startTimer() {
    this.examService.quizStart.next(true);
    this.qsReminder = 1;

    this.quizStarted = true;
    if (this.quiz.settings.strictMode) { 
      this.fullscreenService.enterFullscreen(document.documentElement);
    }
    this._snackbar.open('Quiz Started, Good Luck!!!', null, {
      duration: 3000
    })

    if (this.quiz.settings.timerEnabled) {
      this.timer = this.quiz.settings.timerDuration
      this.intervalId = setInterval(() => {
        if (this.timer > 0) {
          this.timer--;
    
          const hours = Math.floor(this.timer / 3600);
          const minutes = Math.floor((this.timer % 3600) / 60);
          const seconds = this.timer % 60;
      
            // Format hours, minutes, and seconds with leading zeros
          this.hr = hours < 10 ? '0' + hours : hours;
          this.min = minutes < 10 ? '0' + minutes : minutes;
          this.sec = seconds < 10 ? '0' + seconds : seconds;
            
        } else {
          this.stopTimer();

        }
      }, 1000);
    }
  }

  containsMultipleCorrectOptions(question: Question): boolean {
    let correctCount = question.options.filter(option => option.isCorrect).length;
    return correctCount > 1;
  }
  
  stopTimer() {
    this.checkAnswers()
    clearInterval(this.intervalId);
  }

  showNextQuestion() {
    if (this.currentQuestionIndex < this.quiz.questions.length - 1) {
      this.currentQuestionIndex++;
    };
  }
  
  showPreviousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    };
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

    
    if (this.quiz.settings.autoCheckerEnabled) {
      this.totalPoints = this.examService.checker(this.quiz, this.totalPoints);
      if (this.examService.allCorrectAnswersSelected(question)) {
        if (this.quiz.settings.autoAdvance){
          let step = 0; 
          this.value = 0;

          const intervalId = setInterval(() => {
            step += 20;
            this.value = (step / 1000) * 100;

            if (step >= 1000) {
              clearInterval(intervalId);
            }
          }, 10);

          setTimeout(() => {
            clearInterval(intervalId);
            this.showNextQuestion();
            this.value = 0; 
          }, 1000);
        }

        question.options.forEach(opt => {
          opt.disabled = true;
        });
      };
    };
  }

  resetOptions() {
    this.quiz.questions.forEach(question => {
      question.options.forEach(option => {
        option.selected = false;
        option.disabled = false;
      });
    });
  }

  checkAnswers() {
    
    this.totalPoints = this.examService.checker(this.quiz, this.totalPoints);
    this.quizCompleted = true;
    
    this.examService.quizStart.next(false);
    if(this.quiz.settings.strictMode) {
      this.fullscreenService.exitFullscreen();
      this.quizService.onSaveParticipation(
        this.quizService.getResults().length, 
        this.username, 
        this.quiz.title, 
        this.totalPoints, 
        this.quiz.questions.length, 
        this.quiz, 
        this.authService.getIdToken(),
        this.authService.getEmail()
      );
      this.dataStorageService.fetchResults();
      this.dataStorageService.storeResult();
    }

    this.resetOptions();
  }


  // is fullscreen? 

  @HostListener('document:fullscreenchange', ['$event'])
  handleFullscreenChange(event: Event) {
    if (!this.fullscreenService.isFullscreen() && this.quizStarted && !this.quizCompleted) {
      this.pauseQuiz();
    }
  }


  handleVisibilityChange() {
    if (document.hidden && this.quizStarted && !this.quizCompleted) {
      this.pauseQuiz();
    }
  }

  pauseQuiz() {
    this.quizStarted = false;
    alert('Quiz paused. Please return to fullscreen to continue.');
    this._snackbar.open('Quiz paused. Please return to fullscreen to continue.', null, {
      duration: 3000
    });
  }



  ngOnDestroy(): void {
    this.examService.quizStart.next(false);

    this.subs$.unsubscribe();
    console.log('works')
  }

}
