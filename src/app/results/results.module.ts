import { NgModule } from "@angular/core";
import { ResultsComponent } from "./results.component";
import { ResultCheckComponent } from "./result-check/result-check.component";
import { SharedModule } from "../shared/shared.module";


@NgModule({
    declarations: [
        ResultsComponent,
        ResultCheckComponent,
    ],
    imports: [
        SharedModule
    ]
})
export class ResultsModule {}