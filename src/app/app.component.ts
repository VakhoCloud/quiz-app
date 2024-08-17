import { Component, OnInit } from '@angular/core';
import { DataStorageService } from './shared/data-storage.service';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  
  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // this.dataStorageService.fetchQuizzes().subscribe();
    // this.dataStorageService.fetchResults().subscribe();
    this.authService.autoLogin();
  }



}
