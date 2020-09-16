import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Invoice } from '../../models/invoice';

@Component({
  selector: 'app-invoice-view',
  templateUrl: './invoice-view.component.html',
  styleUrls: ['./invoice-view.component.scss']
})
export class InvoiceViewComponent implements OnInit {

  invoice: Invoice;
  total: number;
  tax: number;
  grandTotal: number;
  
  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.data.subscribe((data : {invoice: Invoice}) => {
      this.invoice = data.invoice;
      console.log(this.invoice);
      this.total = this.invoice.qty * this.invoice.rate;
      this.tax = (this.invoice.tax/100) * this.total;
      this.grandTotal = this.total + this.tax;
    });
  }

}

