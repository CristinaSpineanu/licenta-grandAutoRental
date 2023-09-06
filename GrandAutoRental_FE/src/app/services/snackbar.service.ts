import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  public constructor(private snackBar: MatSnackBar) {}

  public openSnackBar(message: string, action: string) {
    if (action === 'eroare') {
      this.snackBar.open(message, '', {
        verticalPosition: 'top',
        horizontalPosition: 'center',
        duration: 1500,
        panelClass: ['red-snackBar'],
      });

      console.error('Răspuns de eroare de pe backend:', message);
    } else {
      this.snackBar.open(message, '', {
        verticalPosition: 'top',
        horizontalPosition: 'center',
        duration: 1500,
        panelClass: ['green-snackBar'],
      });
    }
  }
}
