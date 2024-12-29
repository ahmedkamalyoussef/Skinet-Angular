import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Order, OrderToCreate } from '../../shared/models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  baseUrl =environment.apiUrl;
  private http = inject(HttpClient);


  createOrder(order: OrderToCreate) {
    return this.http.post<Order>(this.baseUrl + 'orders', order);
  }
  
  getOrders() {
    return this.http.get<Order[]>(this.baseUrl + 'orders');
  }
  
  getOrder(id: number) {
    return this.http.get<Order>(`${this.baseUrl}orders/${id}`);

  }
}