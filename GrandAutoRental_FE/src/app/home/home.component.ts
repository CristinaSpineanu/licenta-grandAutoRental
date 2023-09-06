import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public anulCurent: number | undefined;
  public metodeDePlata: string[] = [
    'logo-visa.png',
    'logo-americaex.jpg',
    'logo-paypal.jpg',
    'logo-applepay.png',
    'gpay.png',
  ];
  public platformeGroup: { nume: string; link: string }[] = [
    { nume: 'instagram', link: 'https://www.instagram.com/' },
    { nume: 'facebook', link: 'https://www.facebook.com/' },
    { nume: 'youtube', link: 'https://www.youtube.com/' },
    { nume: 'twitter', link: 'https://www.twitter.com/' },
  ];

  public constructor(
    private dialog: MatDialog,
    private router: Router,
    private userService: UserService
  ) {}

  public ngOnInit(): void {
    this.anulCurent = new Date().getFullYear();

    if (localStorage.getItem('token') != null )  {
      //Daca token-ul exista in localStorage apelam un API
      this.userService.verificaToken().subscribe(
        (response: any) => {
          this.router.navigate(['/grandautorental/dashboard']);
        },
        (error: any) => {
          console.log(error);
        }
      );
    }
  }

  public onSignupAction(): void {
    const dialogCaracteristici = new MatDialogConfig();
    dialogCaracteristici.width = '550px';
    this.dialog.open(SignupComponent, dialogCaracteristici); //aici parsam componenta Signup
  }

  public onForgetPasswordAction(): void {
    const dialogCaracteristici = new MatDialogConfig();
    dialogCaracteristici.width = '550px';
    this.dialog.open(ForgotPasswordComponent, dialogCaracteristici); //aici parsam componenta ForgotPasswordComponent
  }

  public onLoginAction(): void {
    const dialogCaracteristici = new MatDialogConfig();
    dialogCaracteristici.width = '550px';
    this.dialog.open(LoginComponent, dialogCaracteristici); //aici parsam componenta LoginComponent
  }


}
