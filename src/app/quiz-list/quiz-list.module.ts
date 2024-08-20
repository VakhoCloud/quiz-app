import { NgModule } from "@angular/core";
import { QuizListComponent } from "./quiz-list.component";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { authGuard } from "../auth/auth.guard";


@NgModule({
  declarations: [
    QuizListComponent
  ],
  imports: [
    RouterModule.forChild([{ path: 'list', component: QuizListComponent, canActivate: [authGuard]},]),
    SharedModule
  ],
})
export class QuizListModule { }
