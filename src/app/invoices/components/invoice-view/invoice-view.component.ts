import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Invoice } from '../../models/invoice';
import * as jspdf from 'jspdf';
import * as _html2canvas from 'html2canvas';
const html2canvas: any = _html2canvas;

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
  isResultsLoading = false;
  
  
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


  downloadBtnHandler(){
    this.isResultsLoading = true;
    let data = document.getElementById('content-to-print');
    html2canvas(data)
    .then(canvas => {
      var imgWidth = 208;   
      var pageHeight = 295;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jspdf.jsPDF('p', 'mm', 'a4');
      var position = 0;  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
      pdf.save(`Invoice-${this.invoice.client.firstName}.pdf`); 
    })
    .then(() => {
      this.isResultsLoading = false;
    })
  }


}

