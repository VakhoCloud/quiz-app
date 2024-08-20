import { NgModule } from "@angular/core";
import { QuizEditorComponent } from "./quiz-editor.component";
import { QuizEditorQuestionComponent } from "./quiz-editor-question/quiz-editor-question.component";
import { SettingsComponent } from "./quiz-editor-question/settings/settings.component";
import { ThemesComponent } from "./quiz-editor-question/themes/themes.component";
import { SharedModule } from "../shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { authGuard } from "../auth/auth.guard";
import { quizEditorGuard } from "./quiz-editor.guard";

@NgModule({
    declarations: [
        QuizEditorComponent,
        QuizEditorQuestionComponent,
        SettingsComponent,
        ThemesComponent,
    ],
    imports: [
        SharedModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            { path: 'editor', component: QuizEditorComponent, canActivate: [authGuard] ,children: [
                {path: 'question', component: QuizEditorQuestionComponent},
                {path: ':id/edit', component: QuizEditorQuestionComponent, canActivate: [quizEditorGuard]}
              ]
            }
        ])
    ]
})
export class QuizEditorModule {}