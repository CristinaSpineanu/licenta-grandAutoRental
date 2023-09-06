import { Component, EventEmitter, HostBinding, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ChangePasswordDialogComponent } from 'src/app/material-component/dialog/change-password-dialog/change-password-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/material-component/dialog/confirmation-dialog/confirmation-dialog.component';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class AppHeaderComponent {
  public role: any;
  public dialogConfig = new MatDialogConfig();
  public lightMode: boolean = true;

  public constructor(
    private router: Router,
    private dialog: MatDialog,
    private themeService: ThemeService
  ) {}

  public logOut() {
    this.dialogConfig.data = {
      message: ' deloghezi',
    };

    const dialogRef = this.dialog.open(
      ConfirmationDialogComponent,
      this.dialogConfig
    );
    const sub = dialogRef.componentInstance.onEmitStatusChanges.subscribe(
      (utilizator) => {
        dialogRef.close();
        localStorage.clear();
        this.router.navigate(['/']);
      }
    );
  }

  public schimbaParola() {
    this.dialogConfig.width = '550px';
    const dialogRef = this.dialog.open(
      ChangePasswordDialogComponent,
      this.dialogConfig
    );
  }

  public  schimbaModul() {
    this.lightMode = !this.lightMode;
    this.themeService.activeazaDarkMode();
  }
}
