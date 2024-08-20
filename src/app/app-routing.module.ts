import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home',
    loadChildren: () => 
      import('./home/home.module').then(
        m => m.HomeModule
      )
  },

  { path: 'auth',
    loadChildren: () => 
      import('./auth/auth.module').then(
        m => m.AuthModule
      )
  },

  { path: 'list',
    loadChildren: () => 
      import('./quiz-list/quiz-list.module').then(
        m => m.QuizListModule
      )
  },

  { path: 'preview',
    loadChildren: () => 
      import('./quiz-editor/quiz-editor.module').then(
        m => m.QuizEditorModule
      )
  },

  { path: 'preview',
    loadChildren: () => 
      import('./quiz-exam/quiz-exam.module').then(
        m => m.QuizExamModule
      )
  },

  { path: 'results',
    loadChildren: () => 
      import('./results/results.module').then(
        m => m.ResultsModule
      )
    },
    
  { path: '**', redirectTo: '/editor/question'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
