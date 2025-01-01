import { Component, inject, OnInit } from '@angular/core';
import { OrderService } from '../../../core/services/order.service';
import { Order } from '../../../shared/models/order';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { AddressPipe } from '../../../shared/pipes/address.pipe';
import { PaymentDetailsPipe } from '../../../shared/pipes/payment-details.pipe';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-order-detailed',
  standalone: true,
  imports: [
    MatCardModule,
    DatePipe,
    CurrencyPipe,
    AddressPipe,
    PaymentDetailsPipe,
    MatButton,
    RouterLink
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
