import { Component, OnDestroy, OnInit, signal, viewChild } from "@angular/core";
import { faPlus, faList, faCloud, faBars, faUserCircle, faUsers } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";
import { QuizExamService } from "../quiz-exam/quiz-exam.service";
import { MatAccordion } from "@angular/material/expansion";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
    // user
    userEmail: string = '';

    showFiller = false;
    readonly panelOpenState = signal(false);
    accordion = viewChild.required(MatAccordion);

    isAuthenticated = false;
    private userSub: Subscription;
    isQuizStarted = false;

    faPlus = faPlus;
    faList = faList;
    faCloud = faCloud;
    faBars = faBars;
    faUserC= faUserCircle;

    faUsers = faUsers;
    
    

    constructor(
        private authService: AuthService, 
        private examService: QuizExamService,
    ) {}

    ngOnInit(): void {
        this.userSub = this.authService.user.subscribe(user => { 
            if(!!user) {
                this.userEmail = this.authService.getEmail();
            };
            this.isAuthenticated = !!user;
        })

        this.examService.quizStart.subscribe(val => {
            this.isQuizStarted = val;
        })
    }

    onLogout() {
        this.authService.logout();
    }


    ngOnDestroy(): void {
        this.userSub.unsubscribe();
    }


}