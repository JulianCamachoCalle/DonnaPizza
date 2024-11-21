import { Injectable } from '@angular/core';

interface CartItem {
  nombre: string;
  precio: number;
  tamano: string;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: CartItem[] = [];

  getItems(): CartItem[] {
    return this.cartItems;
  }

  addItem(item: CartItem): void {
    this.cartItems.push(item);
  }

  clearCart(): void {
    this.cartItems = [];
  }
}
