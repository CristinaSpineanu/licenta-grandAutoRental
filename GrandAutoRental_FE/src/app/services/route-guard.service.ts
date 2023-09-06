import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { SnackbarService } from './snackbar.service';
import jwt_decode from 'jwt-decode';
import { Constants } from '../shared/constants';

@Injectable({
  providedIn: 'root',
})
export class RouteGuardService {
  public verificaRolul: boolean = false;
  public tokenPayload: any;

  public constructor(
    public auth: AuthService,
    private router: Router,
    private snackbarService: SnackbarService
  ) {}

  public canActivate(route: ActivatedRouteSnapshot): boolean {
    //pentru a pune unele restrictii pe routing
    let expectedRoleArray = route.data;
    expectedRoleArray = expectedRoleArray.expectedRole;

    const token: any = localStorage.getItem('token');
    try {
      this.tokenPayload = jwt_decode(token);


    } catch (err) {
      localStorage.clear();
      this.router.navigate(['/']); //daca avem eroare clear cache si mergi la home page
    }


    for (let i = 0; i < expectedRoleArray.length; i++) {
      if (expectedRoleArray[i] === this.tokenPayload.role) {
        this.verificaRolul = true;
        break;
      }
    }

    if (
      this.tokenPayload.role === 'user' ||
      this.tokenPayload.role === 'admin'
    ) {
      if (this.auth.eAutentificat() && this.verificaRolul) {
        localStorage.setItem('role', this.tokenPayload.role);
        return true;
      }
      if(this.tokenPayload.role === 'user' ){
        this.snackbarService.openSnackBar(Constants.neautorizat, Constants.eroare );
        this.router.navigate(['/grandautorental/order']); //mergi la dashboard
      }
      else if(  this.tokenPayload.role === 'admin'){
        this.snackbarService.openSnackBar(Constants.neautorizat, Constants.eroare );
        this.router.navigate(['/grandautorental/dashboard']); //mergi la dashboard
      }

      return false;
    } else {
      this.router.navigate(['/']); //daca avem eroare clear cache si mergi la home page
      localStorage.clear();
      return false;
    }
  }
}
