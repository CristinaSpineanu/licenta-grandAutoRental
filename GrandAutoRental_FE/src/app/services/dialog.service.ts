import { Injectable } from '@angular/core';
import { SnackbarService } from './snackbar.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  public   constructor(private snackBar:SnackbarService, private dialog: MatDialog) {}

  public deschideLoginDialog(){
    this.dialog.open(LoginComponent,{
      width: '550px',
    })
  }
}
