import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(
    private _snackbar: MatSnackBar,
    private router: Router,
    private authService: AuthService
  ){}


  onCreate() {
    this.authService.user.subscribe(user => {
      if (user) {
        this.router.navigate(['editor', 'question']);
      } else {
        this._snackbar.open('Please sign in!', 'Close', {
          duration: 3000
        });
      }
    });
  } 

  onTake() {
    this.authService.user.subscribe(user => {
      if (user) {
        this.router.navigate(['list']);
      } else {
        this._snackbar.open('Please sign in!', 'Close', {
          duration: 3000
        });
      }
    });
  }
}
