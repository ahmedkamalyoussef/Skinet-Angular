import { CanActivateFn, Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { inject } from '@angular/core';
import { SnackbarService } from '../services/snackbar.service';

export const emptyCartGuard: CanActivateFn = (route, state) => {

  const cartService = inject(CartService);
  const router = inject(Router);
  const snackbar = inject(SnackbarService);
  if (!cartService.cart() || cartService.cart()?.items.length === 0) {
    snackbar.error('Your cart is empty');
    router.navigate(['/cart']);
    return false;
  }
  return true;
};
