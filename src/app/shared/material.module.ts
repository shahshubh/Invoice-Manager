import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule, MatIconModule, MatSidenavModule, MatToolbarModule, MatListModule, MatCardModule, MatTableModule } from '@angular/material';

const exportedMatModules = [
  MatButtonModule,
  MatIconModule,
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatCardModule,
  MatTableModule,
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
