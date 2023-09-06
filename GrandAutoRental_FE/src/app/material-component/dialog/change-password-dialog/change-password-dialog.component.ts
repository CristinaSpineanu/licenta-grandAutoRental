import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import { Constants } from 'src/app/shared/constants';

@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrls: ['./change-password-dialog.component.scss'],
})
export class ChangePasswordDialogComponent implements OnInit {
  public formSchimbareParola: any = FormGroup;
  public raspunsMessage: any;
  public parolaVecheAscunsa: boolean = true;
  public parolaNouaAscunsa: boolean = true;
  public confirmaParolaAscunsa: boolean = true;

  public constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    public dialogRef: MatDialogRef<ChangePasswordDialogComponent>,
    private snackBarService: SnackbarService
  ) {}

  public ngOnInit(): void {
    this.formSchimbareParola = this.formBuilder.group({
      parolaVeche: [null, [Validators.required]],
      parolaNoua: [null, [Validators.required]],
      confirmaParola: [null, [Validators.required]],
    });
  }

  public verificaNouaParolaConfirmParolaMatch(): boolean {
    if (
      this.formSchimbareParola.controls['parolaNoua'].value !==
      this.formSchimbareParola.controls['confirmaParola'].value
    ) {
      return false;
    }
    return true;
  }

  public gestioneazaSchimbareaParoleiOnSubmit() {
    let formData = this.formSchimbareParola.value;
    let data = {
      parolaVeche:formData.parolaVeche,
      parolaNoua:formData.parolaNoua,
      confirmaParola:formData.confirmaParola,
    };
    this.userService.schimbaParola(data).subscribe(
      (raspuns: any) => {
        this.raspunsMessage = raspuns?.message;
        this.dialogRef.close();
        this.snackBarService.openSnackBar(this.raspunsMessage, 'Success');
      },
      (eroare) => {
        console.log(eroare);
        if (eroare.error?.message) {
          this.raspunsMessage = eroare.error?.message;
        } else {
          this.raspunsMessage = Constants.eroareGenerica;
        }
        this.snackBarService.openSnackBar(
          this.raspunsMessage,
          Constants.eroare
        );
      }
    );
  }

  public inchideDialogul(): void {
    this.dialogRef.close();
  }

  public afiseazaParola(event:MouseEvent, formControlName:string){
    event.preventDefault()
    if (formControlName === 'parolaVeche') {
      this.parolaVecheAscunsa = !this.parolaVecheAscunsa;
    } else if (formControlName === 'parolaNoua') {
      this.parolaNouaAscunsa = !this.parolaNouaAscunsa;
    } else if (formControlName === 'confirmaParola') {
      this.confirmaParolaAscunsa = !this.confirmaParolaAscunsa;
    }
  }
}

