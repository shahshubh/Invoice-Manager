import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIcon, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { JwtService } from '../core/services/jwt.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  authForm : FormGroup;
  title = '';
  isLoading = false;

  constructor(
    private fb : FormBuilder,
    private authService: AuthService,
    private jwtService: JwtService,
    private router: Router,
    private snackBar: MatSnackBar

  ) { }

  ngOnInit() {
    this.initForm();
    this.title = this.router.url === '/login' ? 'Login' : 'Signup';
  }


  forgotPassHandler(){
    this.router.navigate(['/forgot-password']);
  }


  onSubmit(){

    if(this.authForm.controls.email.invalid){
      this.snackBar.open('Please enter valid email', 'Warning', {
        duration: 2000,
        verticalPosition: 'top',
        horizontalPosition: 'end'
      });
    }
    else if(this.authForm.controls.password.invalid){
      this.snackBar.open('Password is required', 'Warning', {
        duration: 2000,
        verticalPosition: 'top',
        horizontalPosition: 'end'
      });
    }
    else {
      this.isLoading = true;
      if(this.title === 'Signup'){
        this.authService.signup(this.authForm.value).subscribe(
          data => {
            console.log(data);
            this.isLoading = false;
            this.snackBar.open('User created successfully! Please Login', 'Success', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'end'
            });
            this.router.navigate(['/login']);
          },
          err => this.errorHandler(err, err.error.err)
        );
      }
      else{
        this.authService.login(this.authForm.value).subscribe(
          data => {
            console.log(data);
            this.jwtService.setToken(data.token);
            this.isLoading = false;
            this.router.navigate(['/dashboard', 'invoices']);
          },
          err => this.errorHandler(err, err.error.err)
        );
      }
    }

    
    
  }

  private initForm(){
    this.authForm = this.fb.group({
      email: ['', Validators.email],
      password: ['', Validators.required]
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
