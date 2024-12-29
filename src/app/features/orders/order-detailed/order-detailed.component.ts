import { Component, inject, OnInit } from '@angular/core';
import { OrderService } from '../../../core/services/order.service';
import { Order } from '../../../shared/models/order';
import { ActivatedRoute } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-order-detailed',
  imports: [
    MatButton,
    MatCardModule,
    DatePipe,
    CurrencyPipe
  ],
  templateUrl: './order-detailed.component.html',
  styleUrl: './order-detailed.component.scss'
})
export class OrderDetailedComponent implements OnInit {
  private orderService = inject(OrderService)
  private activatedRoute = inject(ActivatedRoute)
  order?: Order;

  ngOnInit(): void {
    this.laodOrder();

  }

  laodOrder() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (!id) return;
      this.orderService.getOrder(+id).subscribe({
        next: response => this.order = response
      });
    
  }
}
