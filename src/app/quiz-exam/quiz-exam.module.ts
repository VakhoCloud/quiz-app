import { NgModule } from "@angular/core";
import { QuizExamComponent } from "./quiz-exam.component";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { QuestionCounterPipe } from "../shared/question-counter.pipe";
import { RouterModule } from "@angular/router";
import { authGuard } from "../auth/auth.guard";
import { quizEditorGuard } from "../quiz-editor/quiz-editor.guard";

@NgModule({
    declarations: [
        QuizExamComponent,
        QuestionCounterPipe
    ],
    imports: [
        SharedModule,
        RouterModule.forChild([
            { path: 'preview/:id', component: QuizExamComponent, canActivate: [quizEditorGuard, authGuard]},
            { path: 'preview/:userid/:id', component: QuizExamComponent, canActivate: [quizEditorGuard, authGuard]},
        ]),
        FormsModule,
    ]
})
export class QuizExamModule{}