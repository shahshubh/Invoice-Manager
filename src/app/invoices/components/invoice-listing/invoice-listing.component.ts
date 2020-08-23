import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../../services/invoice.service';
import { Invoice } from '../../models/invoice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoice-listing',
  templateUrl: './invoice-listing.component.html',
  styleUrls: ['./invoice-listing.component.scss']
})
export class InvoiceListingComponent implements OnInit {

  constructor(
    private invoiceService : InvoiceService,
    private router: Router
  ) { }

  displayedColumns = ['item', 'date', 'due', 'qty', 'rate', 'tax', 'action'];
  dataSource: Invoice[] = [];


  saveBtnHandler(){
    this.router.navigate(['dashboard','invoices','new']);
  }

  ngOnInit() {
    this.invoiceService.getInvoices().subscribe(
      data => {
        // data.forEach((e,i) => e.pos = i+1, data);
        this.dataSource = data;
      }, 
      err => {
        console.error(err);
      }
    );
  }
}
