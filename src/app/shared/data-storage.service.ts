import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { QuizService } from "../quiz.service";
import { Quiz } from "./quiz.model";
import { map, tap } from "rxjs";
import { Results } from "./results.model";

@Injectable({providedIn: "root"})
export class DataStorageService {
    
    constructor(
        private http: HttpClient, 
        private quizService: QuizService,
    ) {}

    storeQuizzes() {
        this.fetchQuizzes();
        const quizzes = this.quizService.getQuiz();
        this.http
            .put<Quiz[]>(
                'https://quiz-maker-app-6092c-default-rtdb.europe-west1.firebasedatabase.app/quizzes.json',
                quizzes,
            )
            .subscribe(); 
            // .subscribe((response) => {console.log(response)}); 
    }

    fetchQuizzes() {
        return this.http
            .get<Quiz[]>(
                'https://quiz-maker-app-6092c-default-rtdb.europe-west1.firebasedatabase.app/quizzes.json')
            .pipe(
                map(quizzes => {
                    return quizzes.map(quiz => {
                        return {
                            ...quiz,
                            settings: quiz.settings ? quiz.settings : { timerEnabled: false, autoCheckerEnabled: false }
                        };
                    });
            }), tap(quizzes => {
                this.quizService.setQuizzes(quizzes);
            }))
    }


    storeResult() {
        this.fetchQuizzes();
        const results = this.quizService.getResults();
        this.http
            .put<Results[]>(
                'https://quiz-maker-app-6092c-default-rtdb.europe-west1.firebasedatabase.app/results.json',
                results,
            )
            .subscribe(); 
            // .subscribe((response) => {console.log(response)}); 
    }

    fetchResults() {
        return this.http
            .get<Results[]>(
                'https://quiz-maker-app-6092c-default-rtdb.europe-west1.firebasedatabase.app/results.json')
            .pipe(
                map(results => {
                    return results.map(result => {
                        return {
                            ...result,
                        };
                    });
            }), tap(results => {
                this.quizService.setResults(results)
            }))
    }

}
