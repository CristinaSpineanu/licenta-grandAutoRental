import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SnackbarService } from '../services/snackbar.service';
import { UserService } from '../services/user.service';
import { Constants } from '../shared/constants';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm: any = FormGroup;
  public raspunsMessage: any;
  public parolaAscunsa: boolean = true;
  public tokenDecoded: any;

  public constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: SnackbarService,
    private userService: UserService,
    private dialogRef: MatDialogRef<LoginComponent>
  ) {}

  public ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [
        null,
        [Validators.required, Validators.pattern(Constants.regexEmail)],
      ],
      password: [null, [Validators.required]],
    });
  }

  public onSubmitForm(): void {
    let formData = this.loginForm.value;
    let data = {
      email: formData.email,
      password: formData.password,
    };

    this.userService.login(data).subscribe(
      (response: any) => {
        this.dialogRef.close();
        localStorage.setItem('token', response.token); //in response asteptam un token pe care il vom salva in localstorage

        this.tokenDecoded = jwt_decode(response.token);

        if (this.tokenDecoded.role === 'admin'){
          this.router.navigate(['/grandautorental/dashboard']); //navigam catre dashboard
        }

        if (this.tokenDecoded.role === 'user'){
          this.router.navigate(['/grandautorental/order']); //navigam catre order in cazul unui cont de tip user
        }
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

  public inchideDialogul(): void {
    this.dialogRef.close();
  }

  public afiseazaParola(event: MouseEvent): void {
    event.preventDefault();
    this.parolaAscunsa = !this.parolaAscunsa;
  }
}
