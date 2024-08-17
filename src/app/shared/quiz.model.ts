import { Question } from "./question.model";
import { QuizSettings } from "./quiz-settings.model";

export class Quiz {
    id: number;
    title: string;
    settings: QuizSettings;
    questions: Question[];

    constructor(id: number, title: string, settings: QuizSettings, questions: Question[]) {
        this.id = id;
        this.title = title;
        this.settings = settings;
        this.questions = questions;
    }
}