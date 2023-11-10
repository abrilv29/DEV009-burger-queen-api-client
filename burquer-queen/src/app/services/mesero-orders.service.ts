import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Orders } from '../Interface/ordenes';

@Injectable({
  providedIn: 'root'
})
export class MeseroOrdersService {

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

  getOrders(): Observable<Orders[]> {
    console.log('accessToken', this.httpOptions.headers);
    return this.http.get<Orders[]>(`${this.apiUrl}/orders`, this.httpOptions);
  }
  postOrder(order: Orders): Observable<Orders[]> {
    console.log(order);
    return this.http.post<Orders[]>(`${this.apiUrl}/orders`, order, this.httpOptions);
  }
  
  deleteOrder(orderId: number): Observable<void> {
    console.log(orderId);
    return this.http.delete<void>(`${this.apiUrl}/${orderId}`, this.httpOptions);
  }
  updateOrder(orderId: number, updatedOrder: Orders): Observable<Orders> {
    const url = `${this.apiUrl}/orders/${orderId}`;
    return this.http.put<Orders>(url, updatedOrder, this.httpOptions);
  }
  
}
