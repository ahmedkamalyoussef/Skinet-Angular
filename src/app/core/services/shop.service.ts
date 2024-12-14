import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from '../../shared/models/product';
import { Pagination } from '../../shared/models/pagination';
import { environment } from '../../../environments/environment';
import { ShopParams } from '../../shared/models/shopParams';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  private http = inject(HttpClient);
  types: string[] = [];
  brands: string[] = [];

  getProducts(shopParams: ShopParams) {
    let params= new HttpParams();
    if (shopParams.brands && shopParams.brands.length > 0) {
      params = params.append('brands', shopParams.brands.join(','));
    }
    if (shopParams.types && shopParams.types.length > 0) {
      params = params.append('types', shopParams.types.join(','));
    }
    if (shopParams.sort) {
      params = params.append('sortBy', shopParams.sort);
    }
    if (shopParams.search) {
      params = params.append('search', shopParams.search);
    }
    params = params.append('pageIndex', shopParams.pageIndex.toString());
    params=params.append('pageSize',shopParams.pageSize.toString());
    return this.http.get<Pagination<Product>>(environment.apiUrl + 'products', {params});
  }

  getTypes() {
    if (this.types.length > 0) return;
    return this.http.get<string[]>(environment.apiUrl + 'products/types').subscribe({
      next: response => this.types = response,
      error: error => console.log(error)
    });
  }

  getBrands() {
    if (this.brands.length > 0) return;
    return this.http.get<string[]>(environment.apiUrl + 'products/brands').subscribe({
      next: response => this.brands = response,
      error: error => console.log(error)
    });
  }
}
