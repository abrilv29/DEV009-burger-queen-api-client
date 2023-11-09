import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'; // Asegúrate de importar throwError
import { environment } from 'src/environments/environment';
import { Product } from '../Interface/producto';

@Injectable({
  providedIn: 'root'
})
export class MeseroServiceService {

  private apiUrl = environment.apiUrl;
  private accessToken = sessionStorage.getItem('accessToken'); // Obtener el token de sessionStorage


  constructor(private http: HttpClient) {

      console.log('Valor de accessToken:', this.accessToken);
    }

   
    httpOptions = {
      headers: new HttpHeaders({
        authorization: 'Bearer ' + sessionStorage.getItem('accessToken'),
      }),
    };
  
  getProducts(): Observable<Product[]> {
    console.log('accessToken', this.httpOptions.headers);
    return this.http.get<Product[]>(`${this.apiUrl}/products`, this.httpOptions);
  
  }

  getProductsByType(type: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products?type=${type}`, this.httpOptions);
  }
}//end class Product
