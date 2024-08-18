import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { QuizService } from "../quiz.service";
import { Quiz } from "./quiz.model";
import { map, tap } from "rxjs";
import { Results } from "./results.model";

@Injectable({providedIn: "root"})
export class DataStorageService {
    userid: string = '';

    constructor(
        private http: HttpClient, 
        private quizService: QuizService,
    ) {}

    storeQuizzes(id: string) {
        this.fetchQuizzes(id);
        const quizzes = this.quizService.getQuiz();
        this.http
            .put<Quiz[]>(
                `https://quiz-maker-app-6092c-default-rtdb.europe-west1.firebasedatabase.app/users/${id}/quizzes.json`,
                quizzes,
            )
            .subscribe(); 
    }

    fetchQuizzes(id: string) {
        return this.http
            .get<Quiz[]>(
                `https://quiz-maker-app-6092c-default-rtdb.europe-west1.firebasedatabase.app/users/${id}/quizzes.json`)
            .pipe(
                map(quizzes => {
                    if (!quizzes) {
                        return [];
                    }
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


    storeResult(id: string) {
        this.fetchResults(id);
        const results = this.quizService.getResults();
        this.http
            .put<Results[]>(
                `https://quiz-maker-app-6092c-default-rtdb.europe-west1.firebasedatabase.app/users/${id}/results.json`,
                results,
            )
            .subscribe(results => {
                console.log(results)
            }); 
    }

    fetchResults(id: string) {
        return this.http
            .get<Results[]>(
               `https://quiz-maker-app-6092c-default-rtdb.europe-west1.firebasedatabase.app/users/${id}/results.json`)
            .pipe(
                map(results => {
                    if (!results) {
                        return []; 
                    }
                    return results.map(result => {
                        return {
                            ...result,
                        };
                    });
            }), tap(results => {

                this.quizService.setResults(results);
            }))

    }

}
