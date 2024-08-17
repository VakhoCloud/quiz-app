import { NgModule } from "@angular/core";
import { QuizExamComponent } from "./quiz-exam.component";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { QuestionCounterPipe } from "../shared/question-counter.pipe";

@NgModule({
    declarations: [
        QuizExamComponent,
        QuestionCounterPipe
    ],
    imports: [
        SharedModule,
        FormsModule,
    ]
})
export class QuizExamModule{}