import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { SnackbarService } from '../services/snackbar.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Constants } from '../shared/constants';
import { LoginComponent } from '../login/login.component';
import { DialogService } from '../services/dialog.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  public signupForm: any = FormGroup;
  public raspunsMessage: any;
  public parolaAscunsa: boolean = true;

  public constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private snackBar: SnackbarService,
    private dialogRef: MatDialogRef<SignupComponent>,
    private dialogService: DialogService,

  )
  {}

  public ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: [
        null,
        [Validators.required, Validators.pattern(Constants.regexNume)],
      ],
      email: [
        null,
        [Validators.required, Validators.pattern(Constants.regexEmail)],
      ],
      contactNumber: [
        null,
        [Validators.required, Validators.pattern(Constants.regexNumarTelefon)],
      ],
      password: [null, Validators.required],
    });
  }

  public onSubmitForm() {
    let fromData = this.signupForm.value;
    let data = {
      name: fromData.name,
      contactNumber: fromData.contactNumber,
      email: fromData.email,
      password: fromData.password,
    }; //trimitem data de pe FE catre BE pentru ruta de signup

    this.userService.signup(data).subscribe(
      (response: any) => {
        this.dialogRef.close();
        this.raspunsMessage = response?.message;
        this.snackBar.openSnackBar(this.raspunsMessage, ''); //nu parsam nicium mesaj
        this.router.navigate(['/']); //navigam de fapt la aceeasi pagina,deci doar inchidel modalul
      },
      (error) => {
        if (error.error?.message) {
          this.raspunsMessage = error.error?.message;
        } else {
          this.raspunsMessage = Constants.eroareGenerica;
        }
        this.snackBar.openSnackBar(this.raspunsMessage, Constants.eroare);
      }
    );
  }

  public afiseazaParola(event: MouseEvent): void {
    event.preventDefault()
    this.parolaAscunsa = !this.parolaAscunsa;
  }

  public inchideDialogul(): void {
    this.dialogRef.close();
  }

  public deschideLoginDialog():void{
    this.dialogRef.close();
    this.dialogService.deschideLoginDialog();
  }


}
