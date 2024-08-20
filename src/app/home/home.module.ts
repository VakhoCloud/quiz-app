import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { HomeComponent } from "./home.component";
import { RouterModule } from "@angular/router";

@NgModule({
    providers: [HomeComponent],
    imports: [ 
        SharedModule,
        RouterModule.forChild([
            { path: 'home', component: HomeComponent, pathMatch: 'full' },
        ]),
    ]
})
export class HomeModule {}