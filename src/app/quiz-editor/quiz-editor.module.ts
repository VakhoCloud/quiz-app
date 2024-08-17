import { NgModule } from "@angular/core";
import { QuizEditorComponent } from "./quiz-editor.component";
import { QuizEditorQuestionComponent } from "./quiz-editor-question/quiz-editor-question.component";
import { SettingsComponent } from "./quiz-editor-question/settings/settings.component";
import { ThemesComponent } from "./quiz-editor-question/themes/themes.component";
import { SharedModule } from "../shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";

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
    ]
})
export class QuizEditorModule {}