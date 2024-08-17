import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, take, tap, throwError } from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {
    user = new BehaviorSubject<User>(null);
    private tokenExpirationTimer: any;
    private tokenSubject = new BehaviorSubject<string>(null);
    private adminEmail = 'admin@test.com' 
    private adminIdToken = 'tPZ6Dr7aH7YprWPvIud7b1XZiul1';   // private idToken = this.user.value.id 

    constructor(private http: HttpClient, private router: Router) {}

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBLi7OVkmjRZL0uNUYGLaRWiNg4XbgOGJk',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.handleError), 
        tap(resData => {
           this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
        }));   
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBLi7OVkmjRZL0uNUYGLaRWiNg4XbgOGJk',
            {
                email: email,
                password: password,       
                returnSecureToken: true 
            } 
        ).pipe(catchError(this.handleError), 
        tap(resData => {
           this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
        }));
    }

    autoLogin() {
        const userData: {
            email: string;
            id: string;
            _token: string;
            _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData'));

        if (!userData) {
            return;
        };

        const loadedUser = new User(
            userData.email, 
            userData.id, 
            userData._token, 
            new Date(userData._tokenExpirationDate)
        );

        if (loadedUser.token) {
            this.user.next(loadedUser);
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        };
    }

    logout() {
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    autoLogout(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration)
    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) { 
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000 );
        const user = new User(
            email,
            userId, 
            token, 
            expirationDate
        );
        this.user.next(user);
        this.autoLogout(expiresIn * 1000 );
        localStorage.setItem('userData', JSON.stringify(user));
    }

    getToken() {
        // let currentToken: string;
        // this.user.pipe(
        //     take(1),
        //     map(user => user ? user.token : null)
        // ).subscribe(token => currentToken = token);
        // return currentToken;
        return this.tokenSubject.asObservable().pipe(take(1));
    }

    getIdToken() { 
        return this.user.value ? this.user.value.id : null;
    }   

    getEmail() { 
        return this.user.value.email;
    }    


    getAdminIdToken(){
        return this.adminIdToken;
    } 
    getAdminEmail(){
        return this.adminEmail;
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = new Error('An unknown error occured!')
        if(!errorRes.error || !errorRes.error.error){
            return throwError(() => errorMessage);
        }
        console.log(errorRes.error.error.message)

        switch(errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = new Error('The email address is already in use by another account.'); break;
            case 'OPERATION_NOT_ALLOWED':
                errorMessage = new Error('Password sign-in is disabled for this project.'); break;
            case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                errorMessage = new Error('We have blocked all requests from this device due to unusual activity. Try again later.'); break; 
            case 'EMAIL_NOT_FOUND':
                errorMessage = new Error('There is no user record corresponding to this identifier. The user may have been deleted.'); break;
            case 'INVALID_PASSWORD':
                errorMessage = new Error(' The password is invalid or the user does not have a password.'); break;
            case 'USER_DISABLED':
                errorMessage = new Error('The user account has been disabled by an administrator.');
                break;
            default:
                errorMessage = new Error('Invalid login credentials');
        }
        return throwError(() => errorMessage);
    }
}
