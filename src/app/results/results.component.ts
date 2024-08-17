import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { QuizService } from '../quiz.service';
import { DataStorageService } from '../shared/data-storage.service';
import { Results } from '../shared/results.model';
import { Router } from '@angular/router';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { ResultsService } from './results.service';
import { Subscription } from 'rxjs';
import { ViewportScroller } from '@angular/common';
import { AuthService } from '../auth/auth.service';


export interface PeriodicElement {
  username: string;
  quizName: string;
  score: number;
  email: string;
}


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrl: './results.component.css'
})
export class ResultsComponent implements OnInit, AfterViewInit, OnDestroy{
  results: Results[] = [];
  checkMode: boolean = false;
  private activatedSub$: Subscription;
  userId: string = '';
  userEmail: string = '';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = ['username', 'quizName', 'score', 'email',];
  dataSource = new MatTableDataSource();

  constructor(
    private quizService: QuizService, 
    private dataStorageService: DataStorageService,
    private router: Router,
    private viewportScroller: ViewportScroller,
    private _liveAnnouncer: LiveAnnouncer,
    private resultsService: ResultsService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {  
    this.userId = this.authService.getIdToken();
    this.userEmail = this.authService.getEmail();

    this.dataStorageService.fetchResults().subscribe((results: Results[]) => {
      if (this.userEmail === this.authService.getAdminEmail() &&  this.userId === this.authService.getAdminIdToken()){ 
        this.results = results;
      } else { 
        results.forEach(res => { 
          if (res.email === this.userEmail && res.userId === this.userId) { 
            this.results.push(res);
          }
        })
      }
      this.dataSource.data = this.results;    
    });

    this.quizService.participantChanged.subscribe((results: Results[]) => {
      if (this.userEmail === this.authService.getAdminEmail() &&  this.userId === this.authService.getAdminIdToken()){ 
        this.results = results;
      } else if (results.length === this.results.length) {
        let temp = [] 
        results.forEach(res => { 
          if (res.email === this.userEmail && res.userId === this.userId) { 
            temp.push(res);
          }
        })
        if (temp.length !== this.results.length ){ 
          this.results = temp;
        }
      }
      this.dataSource.data = this.results;
    });
    
    this.activatedSub$ = this.resultsService.checkMode.subscribe(condition =>  {
      this.checkMode = condition;
    });

  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onCheckNavigate(id: number, username: string): void {

    this.checkMode = true;
    this.resultsService.checkMode.next(this.checkMode);
    this.router.navigate(['results', 'check', id, username]).then(() => {
      this.viewportScroller.scrollToPosition([0, 0]);
    });


  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  



  ngOnDestroy(): void {
    this.activatedSub$.unsubscribe();

  }
}