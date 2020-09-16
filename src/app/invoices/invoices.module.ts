import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceListingComponent } from './components/invoice-listing/invoice-listing.component';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InvoiceService } from './services/invoice.service';
import { InvoiceFormComponent } from './components/invoice-form/invoice-form.component';
import { InvoiceViewComponent } from './components/invoice-view/invoice-view.component';
import { RouterModule } from '@angular/router';
import { EditInvoiceResolverService } from './services/edit-invoice-resolver.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [InvoiceListingComponent, InvoiceFormComponent, InvoiceViewComponent],
  exports: [InvoiceListingComponent, InvoiceFormComponent],
  providers: [
    InvoiceService,
    EditInvoiceResolverService
  ]
})
export class InvoicesModule { }
