import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceListingComponent } from './components/invoice-listing/invoice-listing.component';
import { MaterialModule } from '../shared/material.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InvoiceService } from './services/invoice.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
  ],
  declarations: [InvoiceListingComponent],
  exports: [InvoiceListingComponent],
  providers: [
    InvoiceService
  ]
})
export class InvoicesModule { }
