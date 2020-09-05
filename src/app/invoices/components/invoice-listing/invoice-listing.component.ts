import { Component, OnInit, ViewChild } from '@angular/core';
import { InvoiceService } from '../../services/invoice.service';
import { Invoice } from '../../models/invoice';
import { Router } from '@angular/router';
import { MatSnackBar, MatPaginator, MatSort } from '@angular/material';
import { remove } from 'lodash';
import 'rxjs/Rx';

@Component({
  selector: 'app-invoice-listing',
  templateUrl: './invoice-listing.component.html',
  styleUrls: ['./invoice-listing.component.scss']
})
export class InvoiceListingComponent implements OnInit {

  constructor(
    private invoiceService : InvoiceService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  displayedColumns = ['item', 'date', 'due', 'qty', 'rate', 'tax', 'action'];
  dataSource: Invoice[] = [];
  resultsLength = 0;
  isLoading = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  saveBtnHandler(){
    this.router.navigate(['dashboard','invoices','new']);
  }

  editBtnHandler(id){
    this.router.navigate(['dashboard','invoices',`${id}`]);
  }

  deleteBtnHandler(id){
    this.invoiceService.deleteInvoice(id).subscribe(
      data => {
        const removedItem = remove(this.dataSource,(item) => {
          return item._id === data._id
        });
        this.dataSource = [...this.dataSource];
        this.snackBar.open('Invoice deleted', 'Success', {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'end'
        })
      },
      err => this.errorHandler(err, 'Failed to delete invoice.')
    );
  }

  ngOnInit() {
    this.isLoading = true;
    this.paginator.page.flatMap(
      data => {
        return this.invoiceService.getInvoices(
          { 
            page: this.paginator.pageIndex,
            perPage: this.paginator.pageSize,
            sortField:this.sort.active,
            sortDir: this.sort.direction 
          }
        )
      }
    )
    .subscribe(
      data => {
        this.dataSource = data.docs;
        this.resultsLength = data.total;
        this.isLoading = false;
      }, 
      err => this.errorHandler(err, 'Failed to load invoices')
    );


    this.sort.sortChange.flatMap(() => {
      // this.isLoading = true;
      this.paginator.pageIndex = 0;
      return this.invoiceService.getInvoices(
        { 
          page: this.paginator.pageIndex,
          perPage: this.paginator.pageSize,
          sortField:this.sort.active,
          sortDir: this.sort.direction 
        }
      )
    })
    .subscribe(
      data => {
        this.dataSource = data.docs;
        this.resultsLength = data.total;
        // this.isLoading = false;
      }, 
      err => this.errorHandler(err, 'Failed to load invoices')
    );

    
    this.populateInvoices();
  }

  ngAfterViewInit(){
    
  }

  private populateInvoices(){
    this.isLoading = true;
    this.invoiceService.getInvoices({ 
      page: this.paginator.pageIndex,
      perPage: this.paginator.pageSize,
      sortField: this.sort.active,
      sortDir: this.sort.direction
    }).subscribe(
      data => {
        // data.forEach((e,i) => e.pos = i+1, data);
        this.dataSource = data.docs;
        this.resultsLength = data.total;
        
        setTimeout(() => this.isLoading = false ,800);
      }, 
      err => this.errorHandler(err, 'Failed to load invoices')
    );
  }

  private errorHandler(error, message){
    this.isLoading = false;
    console.error(error);
    this.snackBar.open(message, 'Error', {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'end'
    });
  }


}
