import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public backendUrl = environment.backendUrl;

  public constructor(private httpClient: HttpClient) {}

  public signup(data: any) {
    return this.httpClient.post(this.backendUrl + '/user/signup', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }

  public forgotPassword(data: any) {
    return this.httpClient.post(
      this.backendUrl + '/user/forgot-password',
      data,
      {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      }
    );
  }

  public login(data: any) {
    return this.httpClient.post(this.backendUrl + '/user/login', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }

  public verificaToken() {
    return this.httpClient.post(this.backendUrl + '/user/check-token', {});
  }

  public schimbaParola(data: any) {
    return this.httpClient.post(
      this.backendUrl + '/user/change-password',
      data,
      {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      }
    );
  }

  public getAllUilizatori() {
    return this.httpClient.get(this.backendUrl + '/user/get-users/');
  }

  public updateUtilizator(data:any) {
    return this.httpClient.patch(this.backendUrl + '/user/update-user',data,{
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }
}
