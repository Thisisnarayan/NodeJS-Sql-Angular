import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {PaginationComponent} from './pagination/pagination.component';
import { FormsModule } from '@angular/forms';
import {MatSortModule} from '@angular/material/sort';

@NgModule({
  declarations: [PaginationComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    FlexLayoutModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatCardModule,
    MatSortModule
  ],
  exports: [MatTableModule , FlexLayoutModule,MatProgressSpinnerModule , PaginationComponent , MatIconModule , MatCardModule , MatSortModule]
})
export class SharedModule { }
