import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  public backendUrl = environment.backendUrl;

  public constructor(private httpClient: HttpClient) {}


    public genereazaRaport(data: any) {
      return this.httpClient.post(this.backendUrl + '/bill/generate-report', data, {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      });
    }


    public getPdf(data:any):Observable<Blob> {
      return this.httpClient.post(this.backendUrl + '/bill/get-report-pdf ',data, {
       responseType:'blob',
      });
    }


    //Folosite pentru pagina de facturi
    public getToateFacturile() {
      return this.httpClient.get(this.backendUrl + '/bill/get-all-bills/');
    }


    public getFacturiDupaEmail(email: string) {
      return this.httpClient.get(this.backendUrl + '/bill/get-user-bill', { params: { email } });
    }


    public stergeFactura(id: any) {
      return this.httpClient.delete(this.backendUrl + '/bill/delete-bill/'+id, {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      });
    }


}
