import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { QuizService } from './quiz.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ResultsModule } from './results/results.module';
import { QuizExamModule } from './quiz-exam/quiz-exam.module';
import { SharedModule } from './shared/shared.module';
import { QuizEditorModule } from './quiz-editor/quiz-editor.module';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { QuizListModule } from './quiz-list/quiz-list.module';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';



@NgModule({
  declarations: [
    HeaderComponent,
    AppComponent,
    HomeComponent,
  ],
  imports: [
    NgbModule,
    HttpClientModule,
    BrowserModule,
    SharedModule,
    FontAwesomeModule,
    HomeModule,
    ResultsModule,
    QuizEditorModule,
    QuizExamModule,
    QuizListModule,
    AuthModule,
    AppRoutingModule,
  ],
  providers: [
    QuizService, 
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
