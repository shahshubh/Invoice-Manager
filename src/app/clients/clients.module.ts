import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientListingComponent } from './components/client-listing/client-listing.component';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ClientService } from './services/client.service';
import { ClientFormDialog } from './components/client-dialog-form';
import { FormDialogComponent } from './components/form-dialog/form-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  declarations: [ClientListingComponent, ClientFormDialog, FormDialogComponent ],
  exports: [ClientListingComponent],
  providers: [ClientService],
  entryComponents: [FormDialogComponent]
})
export class ClientsModule { }
