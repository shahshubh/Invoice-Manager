import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InvoiceService } from '../../services/invoice.service';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Invoice } from '../../models/invoice';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss']
})
export class InvoiceFormComponent implements OnInit {

  invoiceForm: FormGroup;
  invoice: Invoice;
  constructor(
    private fb: FormBuilder,
    private invoiceService: InvoiceService,
    private snackBar : MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.createForm();
    this.setInvoiceToForm();
  }

  cancelBtnHandler(){
    this.router.navigate(['dashboard','inovices']);
  }

  onSubmit(){

    if(this.invoice){
      //edit invoice
      this.invoiceService.updateInvoice(this.invoice._id, this.invoiceForm.value).subscribe(
        data => {
          this.snackBar.open('Invoice updated successfully!', 'Success', {
            duration: 2000,
            verticalPosition: 'top',
            horizontalPosition: 'end'
          });
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
        this.invoiceService.findInvoice(id).subscribe(
          invoice => {
            this.invoice = invoice;
            this.invoiceForm.patchValue(this.invoice);
          },
          err => this.errorHandler(err, 'Failed to get invoice!')
        )
      }
    )
  }

  createForm(){
    this.invoiceForm = this.fb.group({
      item: ['', Validators.required],
      date: ['', Validators.required],
      due: ['', Validators.required],
      qty: ['', Validators.required],
      rate: '',
      tax: ''
    })
  }

  private errorHandler(error, message){
    console.error(error);
    this.snackBar.open(message, 'Error', {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'end'
    });
  }

}
