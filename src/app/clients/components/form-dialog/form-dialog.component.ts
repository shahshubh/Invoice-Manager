import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss']
})
export class FormDialogComponent implements OnInit {

  clientForm : FormGroup;

  constructor(
      public dialogRef: MatDialogRef<FormDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private fb : FormBuilder,
      private clientService : ClientService
  ) { }

  onNoClick(): void {
      this.dialogRef.close();
  }


  ngOnInit() {
    this.initClientForm();
  }


  private initClientForm(){
    this.clientForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.email],
    })
  }

}
