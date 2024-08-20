import { NgModule } from "@angular/core";
import { ResultsComponent } from "./results.component";
import { ResultCheckComponent } from "./result-check/result-check.component";
import { SharedModule } from "../shared/shared.module";
import { RouterModule } from "@angular/router";
import { authGuard } from "../auth/auth.guard";
import { resultsGuard } from "./results.guard";


@NgModule({
    declarations: [
        ResultsComponent,
        ResultCheckComponent,
    ],
    imports: [
        SharedModule,
        RouterModule.forChild([
            { path: 'results', component: ResultsComponent, canActivate: [authGuard]},
            { path: 'results/check/:id/:username', component: ResultCheckComponent, canActivate: [resultsGuard] },
        ])
    ]
})
export class ResultsModule {}