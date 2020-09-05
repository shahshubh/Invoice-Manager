import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule, MatIconModule, MatSidenavModule, MatToolbarModule, MatListModule, MatCardModule, MatTableModule, MatMenuModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatSnackBarModule, MatPaginatorModule, MatProgressSpinnerModule, MatSortModule } from '@angular/material';

const exportedMatModules = [
  MatButtonModule,
  MatIconModule,
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatCardModule,
  MatTableModule,
  MatMenuModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSnackBarModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule
]

@NgModule({
  imports: [
    CommonModule,
    ...exportedMatModules

  ],
  exports: [
    ...exportedMatModules
  ],
  declarations: []
})
export class MaterialModule { }
