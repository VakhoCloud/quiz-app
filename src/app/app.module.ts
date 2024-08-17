import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { QuizListComponent } from './quiz-list/quiz-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { QuizService } from './quiz.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthComponent } from './auth/auth.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ResultsModule } from './results/results.module';
import { QuizExamModule } from './quiz-exam/quiz-exam.module';
import { SharedModule } from './shared/shared.module';
import { QuizEditorModule } from './quiz-editor/quiz-editor.module';



@NgModule({
  declarations: [
    HeaderComponent,
    AppComponent,
    QuizListComponent,
    AuthComponent,
    HomeComponent,
  ],
  imports: [
    SharedModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    HttpClientModule,
    ResultsModule,
    QuizExamModule,
    QuizEditorModule
  ],
  providers: [
    QuizService, 
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
