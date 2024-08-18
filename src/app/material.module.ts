import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import { MatListModule} from '@angular/material/list'
import { MatSortModule } from "@angular/material/sort";
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatRippleModule} from '@angular/material/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTooltipModule} from '@angular/material/tooltip'; 
import {ClipboardModule} from '@angular/cdk/clipboard';

@NgModule({
    imports: [
      MatSlideToggleModule, 
      MatFormFieldModule, 
      MatInputModule, 
      MatIconModule, 
      MatButtonModule, 
      MatDividerModule,
      MatTableModule,
      MatPaginatorModule,
      MatSelectModule,
      MatCardModule,
      MatListModule,
      MatSortModule,
      MatSidenavModule,
      MatToolbarModule,
      MatRippleModule,
      MatProgressSpinnerModule,
      MatExpansionModule,
      MatStepperModule,
      MatTooltipModule,
      ClipboardModule
    ],
    exports: [
      MatSlideToggleModule, 
      MatFormFieldModule, 
      MatInputModule, 
      MatIconModule, 
      MatButtonModule, 
      MatDividerModule,
      MatTableModule,
      MatPaginatorModule,
      MatSelectModule,
      MatCardModule,
      MatListModule,
      MatSortModule,
      MatSidenavModule,
      MatToolbarModule,
      MatRippleModule,
      MatProgressSpinnerModule,
      MatExpansionModule,
      MatStepperModule,
      MatTooltipModule,
      ClipboardModule
    ],
    
})
export class MaterialModule { }
  