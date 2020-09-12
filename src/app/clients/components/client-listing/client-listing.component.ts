import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatSnackBar, MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';
import { Client } from '../../models/client';
import { ClientService } from '../../services/client.service';
import { FormDialogComponent } from '../form-dialog/form-dialog.component';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'app-client-listing',
  templateUrl: './client-listing.component.html',
  styleUrls: ['./client-listing.component.scss']
})
export class ClientListingComponent implements OnInit {
  displayedColumns = ['firstName', 'lastName', 'email'];
  dataSource = new MatTableDataSource<Client>();
  isLoading = false;

  constructor(
    private clientService : ClientService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.clientService.getClients().subscribe(
      data => {
        // console.log(data);
        this.dataSource.data = data;
      },
      err => console.log(err),
      () => this.isLoading = false 
      // setTimeout(() => this.isLoading = false ,800)
    );
  }

  saveBtnHandler(){

  }

  openDialog(): void {
    let dialogRef = this.dialog.open(FormDialogComponent, {
      width: '400px',
      height: '350px'
    });

    dialogRef.afterClosed()
    .filter(clientParam => typeof clientParam === 'object')
    .flatMap(result => this.clientService.createClient(result))
    .subscribe(
      data => {
        this.dataSource.data = [...this.dataSource.data, data];
        this.snackBar.open('Client created successfully!', 'Success', {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'end'
        });
      },
      err => this.errorHandler(err, 'Failed to create client')
    );
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