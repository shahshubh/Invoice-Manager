import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  form: FormGroup;
  isLoading = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.initForm();
  }


  onSubmit(){
    if(this.form.controls.email.invalid){
      this.snackBar.open('Please enter valid email', 'Warning', {
        duration: 2000,
        verticalPosition: 'top',
        horizontalPosition: 'end'
      });
    } else {
      this.isLoading = true;
      this.authService.forgotPassword(this.form.value).subscribe(
        data => {
          this.isLoading = false;
          console.log(data);
          this.snackBar.open(data.message, 'Success', {
            duration: 3500,
            verticalPosition: 'top',
            horizontalPosition: 'end'
          })
        },
        err => this.errorHandler(err, err.error.err)
      );
    }
  }


  private initForm(){
    this.form = this.fb.group({
      email: ['', Validators.email]
    });
  }

  private errorHandler(error, message){
    this.isLoading = false;
    console.error(error);
    this.snackBar.open(message, 'Failed', {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'end'
    });
  }

}
