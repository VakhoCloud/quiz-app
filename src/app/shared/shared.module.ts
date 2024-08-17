import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "../app-routing.module";
import { MaterialModule } from "../material.module";

@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        AppRoutingModule,
        MaterialModule
    ],
    exports: [
        BrowserModule,
        CommonModule,
        AppRoutingModule,
        MaterialModule
    ]
})
export class SharedModule {}