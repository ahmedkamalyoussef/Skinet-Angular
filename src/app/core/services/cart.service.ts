import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Cart, CartItem } from '../../shared/models/cart';
import { environment } from '../../../environments/environment';
import { Product } from '../../shared/models/product';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private http = inject(HttpClient);
  cart = signal<Cart | null>(null);
  itemsCount = computed(() => this.cart()?.items.reduce((acc, item) => acc + item.quantity, 0));
  totals = computed(()=>{
    const cart = this.cart();
    if (!cart) return null;
    const subTotal = cart.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const shipping = subTotal ? subTotal * 0.1 : 0;
    const discount = subTotal ? subTotal * 0.05 : 0;
    const total = subTotal + shipping - discount;
    return {subTotal, shipping, discount, total};
  });


  getCart(id: string) {
    return this.http.get<Cart>(environment.apiUrl + 'cart?id=' + id).pipe(
      map(cart=>{
        this.cart.set(cart);
        console.log("from api");
        return cart;
      })
    )
  }

  removeItemFromCart(productId: number,quantity=1) {
    const cart = this.cart();
    if (!cart) return;
    const itemIndex = cart.items.findIndex(item => item.productId === productId);
    if (itemIndex === -1) return;
    if(cart.items[itemIndex].quantity > quantity){
      cart.items[itemIndex].quantity-=quantity;
    }else{
      cart.items.splice(itemIndex, 1);
    }
    if(cart.items.length === 0){
      this.deleteCart();
    }else{
      this.setCart(cart);
    }
  }

  deleteCart() {
    return this.http.delete(environment.apiUrl + 'cart?id=' + this.cart()?.id).subscribe({
      next: ()=>{
        localStorage.removeItem('cartId');  
        this.cart.set(null);
      } 
    });
  }

  setCart(cart: Cart) {
    return this.http.post<Cart>(environment.apiUrl + 'cart', cart).subscribe({
      next: response => this.cart.set(response)
    });
  }
  addItemToCart(item: CartItem |Product, quantity=1) {
    const cart = this.cart() ?? this.createCart();
    if (this.isProduct(item)) {
      item = this.mapProductToCartItem(item);
    }
    cart.items=this.addOrUpdateItem(cart, item, quantity);
    this.setCart(cart);
  }

  private createCart(): Cart {
    const cart = new Cart();
    localStorage.setItem('cartId', cart.id);
    return cart;
  }

  private isProduct(item: CartItem | Product): item is Product {
    return (item as Product).id !== undefined;
  }
  private mapProductToCartItem(item: Product): CartItem {
    return {
      productId: item.id,
      productName: item.name,
      pictureUrl: item.imageUrl,
      price: item.price,
      quantity: 0,
      brand: item.brand,
      type: item.type
    };
  }
  private addOrUpdateItem(cart: Cart, item: CartItem, quantity: number):CartItem[] {
    const itemIndex = cart.items.findIndex(c => c.productId === item.productId);
    if (itemIndex === -1) {
      item.quantity = quantity;
      cart.items.push(item);
    } else {
      cart.items[itemIndex].quantity += quantity;
    }
    return cart.items;
  }
}

