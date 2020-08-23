import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InvoiceService } from '../../services/invoice.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss']
})
export class InvoiceFormComponent implements OnInit {

  invoiceForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private invoiceService: InvoiceService,
    private snackBar : MatSnackBar,
    private router: Router
    ) { }

  ngOnInit() {
    this.createForm();
  }

  onSubmit(){
    this.snackBar.open('Invoice created successfully!', 'Success', {
      duration: 2000,
    });
    this.invoiceService.createInvoice(this.invoiceForm.value).subscribe(
      data => {
        this.invoiceForm.reset();
        this.router.navigate(['dashboard','inovices']);
      }, err => this.errorHandler(err, 'Failed to create invoice!')
    );
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
      duration: 2000
    });
  }

}
