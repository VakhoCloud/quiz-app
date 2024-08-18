import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { QuizService } from '../quiz.service';
import { Quiz } from '../shared/quiz.model';
import { Router } from '@angular/router';
import { DataStorageService } from '../shared/data-storage.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AuthService } from '../auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.css'],
})
export class QuizListComponent implements OnInit, AfterViewInit {

  quiz: Quiz[];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns = ['name', 'preview', 'edit', 'delete'];
  dataSource = new MatTableDataSource<Quiz>();

  constructor(
    private quizService: QuizService, 
    private router: Router,
    private dataStorageService: DataStorageService,
    private authService: AuthService,
    private _snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {  
    this.dataStorageService.fetchQuizzes(this.authService.getIdToken()).subscribe();

    this.quizService.quizChanged.subscribe((quizzes: Quiz[]) => {
      this.quiz = quizzes;
      this.dataSource.data = this.quizService.getQuiz();
    });
    this.quiz = this.quizService.getQuiz();
  }
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  navigateToOtherComponent(id): void {
    this.router.navigate(['preview', id]);
  }

  editQuiz(id: number) {
    this.router.navigate(['editor', id, 'edit']);
  }

  onRemoveQuiz(id: number) {
    this.dataStorageService.fetchQuizzes(this.authService.getIdToken());
    this.quizService.removeQuiz(id);
    this.dataStorageService.storeQuizzes(this.authService.getIdToken());
  }


  saveMessage() {
    this._snackbar.open('Quiz link copied', 'Done', {duration: 2000});

  }
  
  setClipboardValue(index: number): string {
    const idToken = this.authService.getIdToken();
    const baseUrl = window.location.origin; // Get the base URL including protocol and host
    const fullUrl = `${baseUrl}${this.router.createUrlTree(['/preview', idToken, index]).toString()}`;  // Create full URL
    return `${fullUrl}`;

  }
}
