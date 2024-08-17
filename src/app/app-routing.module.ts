import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizEditorComponent } from './quiz-editor/quiz-editor.component';
import { QuizListComponent } from './quiz-list/quiz-list.component';
import { QuizExamComponent } from './quiz-exam/quiz-exam.component';
import { QuizEditorQuestionComponent } from './quiz-editor/quiz-editor-question/quiz-editor-question.component';
import { AuthComponent } from './auth/auth.component';
import { authGuard, authRedirectGuard } from './auth/auth.guard';
import { ResultsComponent } from './results/results.component';
import { ResultCheckComponent } from './results/result-check/result-check.component';
import { HomeComponent } from './home/home.component';
import { quizEditorGuard } from './quiz-editor/quiz-editor.guard'
import { resultsGuard } from './results/results.guard';




const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, pathMatch: 'full' },
  { path: 'editor', component: QuizEditorComponent, canActivate: [authGuard] ,children: [
    {path: 'question', component: QuizEditorQuestionComponent},
    {path: ':id/edit', component: QuizEditorQuestionComponent, canActivate: [quizEditorGuard]}
  ]
},
  { path: 'list', component: QuizListComponent, canActivate: [authGuard]},
  { path: 'preview/:id', component: QuizExamComponent, canActivate: [quizEditorGuard, authGuard]},
  // { path: '' , canActivate: [quizEditorGuard, authGuard]},
  { path: 'auth', component: AuthComponent, canActivate: [authRedirectGuard]},
  { path: 'results', component: ResultsComponent, canActivate: [authGuard]},
  { path: 'results/check/:id/:username', component: ResultCheckComponent, canActivate: [resultsGuard] },

  { path: '**', redirectTo: '/editor/question'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
