import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  public backendUrl = environment.backendUrl;

  public constructor(private httpClient: HttpClient) {}

  public adaugaCategorie(data: any) {
    return this.httpClient.post(
      this.backendUrl + '/category/add-category',
      data,
      {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      }
    );
  }

  public updateCategorie(data: any) {
    return this.httpClient.patch(
      this.backendUrl + '/category/update-category',
      data,
      {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      }
    );
  }

  public getCategorii() {
    return this.httpClient.get(this.backendUrl + '/category/get-categories');
  }

  // Rute pentru stergere
  public stergereCategorie(id: any) {
    return this.httpClient.delete(this.backendUrl + '/category/delete-category/' + id, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }
}
