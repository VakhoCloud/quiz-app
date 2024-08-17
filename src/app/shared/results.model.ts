import { Quiz } from "./quiz.model";

export class Results {
    id: number;
    username: string;
    quizName: string;
    score: number;
    totalPoints: number;
    date: Date;
    quiz: Quiz;
    userId: string;
    email: string;

    constructor(id: number, username: string, quizName: string, score: number, totalPoints: number, date: Date, quiz: Quiz, userId: string, email: string) {
        this.id = id;
        this.username = username;
        this.quizName = quizName;
        this.score = score;
        this.totalPoints = totalPoints;
        this.date = date;
        this.quiz = quiz;
        this.userId = userId;
        this.email = email;
    }

}
