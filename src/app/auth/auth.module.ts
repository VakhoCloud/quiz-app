import { NgModule } from "@angular/core";
import { AuthComponent } from "./auth.component";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { authRedirectGuard } from "./auth.guard";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        AuthComponent
    ],
    imports: [
        RouterModule.forChild([{ path: 'auth', component: AuthComponent, canActivate: [authRedirectGuard]},]),
        FormsModule,
        SharedModule,
    ]
}) 
export class AuthModule {}
