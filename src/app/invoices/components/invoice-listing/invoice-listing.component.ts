import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../../services/invoice.service';
import { Invoice } from '../../models/invoice';

@Component({
  selector: 'app-invoice-listing',
  templateUrl: './invoice-listing.component.html',
  styleUrls: ['./invoice-listing.component.scss']
})
export class InvoiceListingComponent implements OnInit {

  constructor(private invoiceService : InvoiceService) { }

  displayedColumns = ['item', 'date', 'due', 'qty', 'rate', 'tax'];
  dataSource: Invoice[] = [];

  

  ngOnInit() {
    this.invoiceService.getInvoices().subscribe(
      data => {
        this.dataSource = data;
        console.log(data);
      }, 
      err => {
        console.error(err);
      }
    );
  }
}
