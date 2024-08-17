import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { QuizService } from '../quiz.service';
import { Quiz } from '../shared/quiz.model';
import { Router } from '@angular/router';
import { DataStorageService } from '../shared/data-storage.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrl: './quiz-list.component.css',
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
  ) { }

  ngOnInit(): void {  
    this.dataStorageService.fetchQuizzes().subscribe();

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
    this.dataStorageService.fetchQuizzes();
    this.quizService.removeQuiz(id);
    this.dataStorageService.storeQuizzes();
  }



}
