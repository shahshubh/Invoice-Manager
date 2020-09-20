import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InvoiceService } from '../../services/invoice.service';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Invoice } from '../../models/invoice';
import { ClientService } from '../../../clients/services/client.service';
import { Client } from '../../../clients/models/client';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss']
})
export class InvoiceFormComponent implements OnInit {

  invoiceForm: FormGroup;
  invoice: Invoice;
  clients: Client[] = [];
  title = 'Create Invoice';
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private invoiceService: InvoiceService,
    private snackBar : MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private clientService: ClientService
    ) { }

  ngOnInit() {
    this.createForm();
    this.setInvoiceToForm();
    this.setClients();
  }

  cancelBtnHandler(){
    this.router.navigate(['dashboard','inovices']);
  }

  onSubmit(){
    this.isLoading = true;

    if(this.invoice){
      //edit invoice
      this.invoiceService.updateInvoice(this.invoice._id, this.invoiceForm.value).subscribe(
        data => {
          this.snackBar.open('Invoice updated successfully!', 'Success', {
            duration: 2000,
            verticalPosition: 'top',
            horizontalPosition: 'end'
          });
          this.isLoading = false;
          this.router.navigate(['dashboard','inovices']);
        },
        err => this.errorHandler(err,'Failed to update invoice!')
      );
    } else{
      //create new invoice
      this.invoiceService.createInvoice(this.invoiceForm.value).subscribe(
        data => {
          this.snackBar.open('Invoice created successfully!', 'Success', {
            duration: 2000,
            verticalPosition: 'top',
            horizontalPosition: 'end'
          });
          this.invoiceForm.reset();
          this.isLoading = false;
          this.router.navigate(['dashboard','inovices']);
        }, err => this.errorHandler(err, 'Failed to create invoice!')
      );
    }
  }

  setInvoiceToForm(){
    this.route.params.subscribe(
      params => {
        let id = params['id'];
        if(!id){
          return;
        }
        this.title  = 'Edit Invoice';
        // this.invoiceService.findInvoice(id).subscribe(
        //   invoice => {
        //     this.invoice = invoice;
        //     this.invoiceForm.patchValue(this.invoice);
        //   },
        //   err => this.errorHandler(err, 'Failed to get invoice!')
        // )

        this.route.data.subscribe((data : {invoice: Invoice}) => {
          this.invoice = data.invoice;
          this.invoiceForm.patchValue(this.invoice);
        })

      }
    )
  }


  private setClients() {
    this.clientService.getClients().subscribe(
      clients => {
        this.clients = clients;
      },
      err => this.errorHandler(err, 'Failed to get clients')
    );
  }

  createForm(){
    this.invoiceForm = this.fb.group({
      item: ['', Validators.required],
      date: ['', Validators.required],
      due: ['', Validators.required],
      qty: ['', Validators.required],
      client: ['', Validators.required],
      rate: ['', Validators.required],
      tax: ['', Validators.required],
    })
  }

  private errorHandler(error, message){
    console.error(error);
    this.isLoading = false;
    this.snackBar.open(message, 'Error', {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'end'
    });
  }

}
