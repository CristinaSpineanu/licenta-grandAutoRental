import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { SnackbarService } from '../services/snackbar.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Constants } from '../shared/constants';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  public forgotPasswordForm: any = FormGroup;
  public raspunsMessage: any;

  public constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private snackBar: SnackbarService,
    private dialogRef: MatDialogRef<ForgotPasswordComponent>
  ) {}

  public ngOnInit(): void {
    this.forgotPasswordForm=this.formBuilder.group({
      email:[null,[Validators.required,Validators.pattern(Constants.regexEmail)]]
    })
  }


  public onSubmitForm() {
    let fromData = this.forgotPasswordForm.value;
    let data = {
      email: fromData.email,
    }; //trimitem data de pe FE catre BE pentru ruta de signup

    this.userService.forgotPassword(data).subscribe( //aici apelam metoda pentru post pe be
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

  public inchideDialogul():void{
    this.dialogRef.close();
  }
}
