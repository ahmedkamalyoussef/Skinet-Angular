import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from '../../shared/models/product';
import { Pagination } from '../../shared/models/pagination';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  private http = inject(HttpClient);

  getProducts() {
    return this.http.get<Pagination<Product>>(environment.apiUrl + 'products?pageSize=50');
  }
}
