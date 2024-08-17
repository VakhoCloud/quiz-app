import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthResponseData, AuthService } from "./auth.service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrl: './auth.component.css',
})
export class AuthComponent {
    isLoginMode = true;
    hide = true;
    error = null;    

    constructor(
        private authService: AuthService,
        private router: Router,
        private _snackbar: MatSnackBar
    ) {}

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        if (form.invalid) {
            return;
        }
        const email = form.value.email;
        const password = form.value.password;

        let authObs: Observable<AuthResponseData>;

        if (this.isLoginMode) {
            authObs = this.authService.login(email, password);
        } else {
            authObs = this.authService.signup(email, password);
        }
        authObs.subscribe(resData => {
            console.log(resData);
            this.router.navigate(['/home']);
            }, errorMessage => {
                this.error = errorMessage;
                console.log(errorMessage);
            });
        this._snackbar.open('Authorized!', null, {
            duration: 3000
        })
        form.reset()
    }
}