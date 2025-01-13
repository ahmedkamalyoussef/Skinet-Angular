import { Component, inject, OnInit, output } from '@angular/core';
import { CheckoutService } from '../../../core/services/checkout.service';
import { MatRadioModule } from '@angular/material/radio';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../../core/services/cart.service';
import { DeliveryMethod } from '../../../shared/models/deliveryMethod';
import { firstValueFrom } from 'rxjs';
@Component({
  selector: 'app-checkout-delivery',
  imports: [
    MatRadioModule,
    CurrencyPipe
  ],
  templateUrl: './checkout-delivery.component.html',
  styleUrl: './checkout-delivery.component.scss'
})
export class CheckoutDeliveryComponent implements OnInit {
  checkoutService = inject(CheckoutService);
  cartService = inject(CartService);
  deliveryComplete = output<boolean>();
  ngOnInit(): void {
    this.checkoutService.getDeliveryMethods().subscribe({
      next: (methods) => {
        const methodId = this.cartService.cart()?.deliveryMethodId;
        if (methodId) {
          const method = methods.find(m => m.id === methodId);
          if (method) {
            this.cartService.selectedDeliveryMethod.set(method);
            this.deliveryComplete.emit(true);
          }
        }
      }
    });
  }

  async updateDeliveryMethod(method: DeliveryMethod){
    this.cartService.selectedDeliveryMethod.set(method);
    const cart = this.cartService.cart();
    if(cart){
      cart.deliveryMethodId = method.id;
      await firstValueFrom(this.cartService.setCart(cart));
      this.deliveryComplete.emit(true);
    }
  }
}
