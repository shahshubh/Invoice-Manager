import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatSnackBar, MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';
import { Client } from '../../models/client';
import { ClientService } from '../../services/client.service';
import { FormDialogComponent } from '../form-dialog/form-dialog.component';
import 'rxjs/add/operator/mergeMap';
import { remove } from 'lodash';

@Component({
  selector: 'app-client-listing',
  templateUrl: './client-listing.component.html',
  styleUrls: ['./client-listing.component.scss']
})
export class ClientListingComponent implements OnInit {
  displayedColumns = ['firstName', 'lastName', 'email', 'action'];
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

  deleteBtnHandler(clientId){
    this.clientService.deleteClient(clientId).subscribe(
      data => {
        const removedItem = remove(this.dataSource.data,(item) => {
          return item._id === data._id
        });
        this.dataSource.data = [...this.dataSource.data];
        this.snackBar.open('Client deleted', 'Success', {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'end'
        })
      },
      err => this.errorHandler(err, 'Failed to delete client.')
    );
  }

  openDialog(clientId: string): void {

    const options = {
      width: '400px',
      height: '350px',
      data: {}
    };
    if(clientId){
      options.data = { clientId: clientId };
    }

    let dialogRef = this.dialog.open(FormDialogComponent, options);

    dialogRef.afterClosed()
    .filter(clientParam => typeof clientParam === 'object')
    .flatMap(result => {
      if(clientId){
        // update 
        return this.clientService.updateClient(clientId, result);
      } else {
        // create new
        return this.clientService.createClient(result)
      }
    })
    .subscribe(
      client => {
        let successMsg = '';
        if(clientId){
          const index = this.dataSource.data.findIndex(client => client._id === clientId);
          this.dataSource.data[index] = client;
          successMsg = 'Client updated successfully!';
          this.dataSource.data = [...this.dataSource.data];
        } 
        else {
          this.dataSource.data = [...this.dataSource.data, client];
          successMsg = 'Client created successfully!';
        }
        
        this.snackBar.open(successMsg, 'Success', {
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