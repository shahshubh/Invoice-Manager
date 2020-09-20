import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  form: FormGroup;
  isLoading = false;
  private token = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.initForm();
    this.token = this.route.snapshot.params['token'];
    
  }

  onSubmit(){
    this.isLoading = true;
    let { password, confirmPassword } = this.form.value;
    if(password !== confirmPassword){
      this.snackBar.open('Passwords do not match', 'Warning', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'end'
      });
      this.isLoading = false;
      return;
    }

    this.authService.resetPassword({token: this.token, password: password}).subscribe(
      data => {
        console.log(data);
        this.snackBar.open('Password updated successfully.', 'Success', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'end'
        });
        this.isLoading = false;
        this.router.navigate(['/login']);
      },
      err => {
        console.log(err);
        return this.errorHandler(err, err.error.err)
      }
    );
  }

  private initForm(){
    this.form = this.fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
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
