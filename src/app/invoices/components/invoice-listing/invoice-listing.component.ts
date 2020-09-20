import { Component, OnInit, ViewChild } from '@angular/core';
import { InvoiceService } from '../../services/invoice.service';
import { Invoice } from '../../models/invoice';
import { Router } from '@angular/router';
import { MatSnackBar, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { remove } from 'lodash';
import 'rxjs/Rx';
import { of as observableOf } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators/map';
import { startWith } from 'rxjs/operators/startWith';
import { switchMap } from 'rxjs/operators/switchMap';
import { merge } from 'rxjs/observable/merge';



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

  displayedColumns = ['item', 'client', 'qty', 'rate', 'tax', 'action'];
  dataSource = new MatTableDataSource<Invoice>();
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
        console.log("Before");
        console.log(this.dataSource);
        const removedItem = remove(this.dataSource.data,(item) => {
          return item._id === data._id
        });
        console.log("After");
        console.log(this.dataSource);
        this.dataSource.data = [...this.dataSource.data];
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
    
    merge(this.paginator.page, this.sort.sortChange)
    .pipe(
      startWith({}),
      switchMap(() => {
        this.isLoading = true;
        return this.invoiceService.getInvoices(
          { 
            page: this.paginator.pageIndex,
            perPage: this.paginator.pageSize,
            sortField:this.sort.active,
            sortDir: this.sort.direction,
            filter: ''
          }
        )
      }),
      map(data => {
        this.isLoading = false;
        // setTimeout(() => this.isLoading = false ,800);
        this.resultsLength = data.total;
        this.dataSource.data = data.docs;
        return data;
      }),
      catchError(() => {
        this.isLoading = false;
        this.errorHandler('Error', 'Failed to fetch Invoices');
        return observableOf([]);
      })
    )
    .subscribe(data => {
      console.log("HRE +++ ",data);
      // this.dataSource.data = data;
    })
  }

  ngAfterViewInit(){
    // this.isLoading = true;
    // this.paginator.page.flatMap(
    //   data => {
    //     return this.invoiceService.getInvoices(
    //       { 
    //         page: this.paginator.pageIndex,
    //         perPage: this.paginator.pageSize,
    //         sortField:this.sort.active,
    //         sortDir: this.sort.direction 
    //       }
    //     )
    //   }
    // )
    // .subscribe(
    //   data => {
    //     this.dataSource = data.docs;
    //     this.resultsLength = data.total;
    //     this.isLoading = false;
    //   }, 
    //   err => this.errorHandler(err, 'Failed to load invoices')
    // );


    // this.sort.sortChange.flatMap(() => {
    //   // this.isLoading = true;
    //   this.paginator.pageIndex = 0;
    //   return this.invoiceService.getInvoices(
    //     { 
    //       page: this.paginator.pageIndex,
    //       perPage: this.paginator.pageSize,
    //       sortField:this.sort.active,
    //       sortDir: this.sort.direction 
    //     }
    //   )
    // })
    // .subscribe(
    //   data => {
    //     this.dataSource = data.docs;
    //     this.resultsLength = data.total;
    //     // this.isLoading = false;
    //   }, 
    //   err => this.errorHandler(err, 'Failed to load invoices')
    // );

    
    // this.populateInvoices();

  }


  filterText(filterValue){
    this.isLoading = true;
    filterValue = filterValue.trim();
    this.paginator.pageIndex = 0;
    return this.invoiceService.getInvoices(
      { 
        page: this.paginator.pageIndex,
        perPage: this.paginator.pageSize,
        sortField:this.sort.active,
        sortDir: this.sort.direction,
        filter: filterValue
      }
    )
    .subscribe(data => {
      this.dataSource.data = data.docs;
      this.resultsLength = data.total;
      this.isLoading = false;
    }, err => this.errorHandler(err, 'Failed to search invoices'));


  }


  // private populateInvoices(){
  //   this.isLoading = true;
  //   this.invoiceService.getInvoices({ 
  //     page: this.paginator.pageIndex,
  //     perPage: this.paginator.pageSize,
  //     sortField: this.sort.active,
  //     sortDir: this.sort.direction,
  //     filter: ''
  //   }).subscribe(
  //     data => {
  //       // data.forEach((e,i) => e.pos = i+1, data);
  //       // this.dataSource = data.docs;
  //       this.resultsLength = data.total;
        
  //       setTimeout(() => this.isLoading = false ,800);
  //     }, 
  //     err => this.errorHandler(err, 'Failed to load invoices')
  //   );
  // }

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
