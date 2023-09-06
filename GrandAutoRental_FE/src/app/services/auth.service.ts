import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public tokenPayload:any;

  public constructor(private router: Router) {}

  public eAutentificat(): boolean {
    const token = localStorage.getItem('token');

    if (!token) {
      this.router.navigate(['/']); //mergi la home page
      return false;
    } else {
      return true;
    }
  }


  public getLoggedInUserRole(): string | null {
    const token: any = localStorage.getItem('token');
    if (token) {
      try {
        this.tokenPayload = jwt_decode(token);
        return this.tokenPayload.role;
      } catch (err) {
        console.error('Eroare la decodare', err);
      }
    }
    return null;
  }



  public getLoggedInUserEmail(): string | null {
    const token: any = localStorage.getItem('token');
    if (token) {
      try {
        this.tokenPayload = jwt_decode(token);
        return this.tokenPayload.email;
      } catch (err) {
        console.error('Eroare la decodare', err);
      }
    }
    return null;
  }
}

