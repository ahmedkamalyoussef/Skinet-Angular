import { Component, inject, OnInit } from '@angular/core';
import { ShopService } from '../../../core/services/shop.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../shared/models/product';
import { CurrencyPipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatDivider } from '@angular/material/divider';
import { CartService } from '../../../core/services/cart.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    CurrencyPipe,
    MatButton,
    MatIcon,
    MatInput,
    MatFormField,
    MatLabel,
    MatDivider,
    FormsModule
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  private shopService = inject(ShopService);
  private activatedRoute = inject(ActivatedRoute);
  private cardService = inject(CartService);
  product?: Product;
  quantity = 1;
  quantityInCart = 0;


  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.shopService.getProduct(+id).subscribe({
        next: response => {
          this.product = response,
          this.updateQuantityInCart();
        },
        error: error => console.log(error)
      });
    }
  }

  updateQuantityInCart() {
    this.quantityInCart = this.cardService.cart()?.items.find(item => item.productId === this.product?.id)?.quantity || 0;
    this.quantity = this.quantityInCart || 1;
  }

  getButtonText() {
    return this.quantityInCart ? 'Update Quantity' : 'Add To Cart';
  }

  updateCart() {
    if (!this.product) return;
    if (this.quantity>this.quantityInCart){
      this.cardService.addItemToCart(this.product, this.quantity-this.quantityInCart);
      return;
    }
    if (this.quantity<this.quantityInCart){
      this.cardService.removeItemFromCart(this.product.id, this.quantityInCart-this.quantity);
      return;
    }
  }
}
