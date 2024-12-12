import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./layout/header/header.component";
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Product } from './shared/models/product';
import { Pagination } from './shared/models/pagination';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private http = inject(HttpClient);
  title = 'Skinet';
  products: Product[]=[];
  ngOnInit(): void {
    this.http.get<Pagination<Product>>(environment.apiUrl + 'products').subscribe({
      next: response => {this.products= response.items;
        console.log(this.products);
      },
      error: error => console.log(error),
      complete: () => console.log('Request Completed')
    });
  }
}
