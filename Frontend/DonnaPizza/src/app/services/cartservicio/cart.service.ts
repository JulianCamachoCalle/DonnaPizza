import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  private apiUrl = 'http://localhost:8080/api/v1/pedidos'; // Ruta del backend para pedidos

  constructor(private http: HttpClient) {}

  // Obtiene los ítems del carrito
  getItems(): CartItem[] {
    return this.cartItems;
  }

  // Agrega un ítem al carrito
  addItem(item: CartItem): void {
    this.cartItems.push(item);
  }

  // Limpia el carrito
  clearCart(): void {
    this.cartItems = [];
  }

  // Registra un pedido en el backend
  createPedido(pedido: any): Observable<any> {
    return this.http.post(this.apiUrl, pedido);
  }
}