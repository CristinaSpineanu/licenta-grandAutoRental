import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  public url = environment.backendUrl;

  public constructor(private httpClient: HttpClient) {}

  public getDetails(): any {
    return this.httpClient.get(this.url + "/dashboard/overview/");
  }
}
