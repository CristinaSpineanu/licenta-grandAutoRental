import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  public backendUrl = environment.backendUrl;

  public constructor(private httpClient: HttpClient) {}

  // Rute pentru adaugare
  public adauga(data: any) {
    return this.httpClient.post(this.backendUrl + '/car/add-car', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }

  // Rute pentru aducerea datelor
  public getMasini() {
    return this.httpClient.get(this.backendUrl + '/car/get-cars');
  }

  public getMasiniByCategorieId(id: any) {
    return this.httpClient.get(this.backendUrl + '/car/get-by-category/' + id);
  }

  public getMasiniByMasinaId(id: any) {
    return this.httpClient.get(this.backendUrl + '/car/get-by-car/' + id);
  }

  // Rute pentru editare
  public editeazaMasina(data: any) {
    return this.httpClient.patch(this.backendUrl + '/car/update-car', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }

  public editeazaStatus(data: any) {
    return this.httpClient.patch(this.backendUrl + '/car/update-status', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }

  // Rute pentru stergere
  public stergereMasina(id: any) {
    return this.httpClient.delete(this.backendUrl + '/car/delete-car/' + id, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }
}
