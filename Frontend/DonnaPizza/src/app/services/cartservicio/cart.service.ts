import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interfaz para los ítems del carrito
interface CartItem {
  id: number; // ID único del producto
  nombre: string; // Nombre del producto
  precio: number; // Precio unitario
  tamano: string; // Tamaño ('mediana' o 'familiar')
  tipo: string; // Tipo del producto ('pizza', 'pasta', 'entrada')
  cantidad: number; // Cantidad en el carrito
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: CartItem[] = []; // Array del carrito

  private apiUrl = 'http://localhost:8080/api/v1/pedidos'; // Endpoint de pedidos
  private detalleApiUrl = 'http://localhost:8080/api/v1/detalles-pedido'; // Endpoint de detalles

  constructor(private http: HttpClient) {}

  // Obtiene los ítems del carrito
  getItems(): CartItem[] {
    return this.cartItems;
  }

  // Agrega un ítem al carrito
  addItem(item: CartItem): void {
    const existingItem = this.cartItems.find(
      (cartItem) =>
        cartItem.nombre === item.nombre &&
        cartItem.tamano === item.tamano &&
        cartItem.tipo === item.tipo
    );

    if (existingItem) {
      existingItem.cantidad += 1;
    } else {
      this.cartItems.push({ ...item, cantidad: 1 });
    }
  }

  // Limpia el carrito
  clearCart(): void {
    this.cartItems = [];
  }

  // Actualiza la cantidad de un ítem
  updateQuantity(index: number, cantidad: number): void {
    if (index >= 0 && index < this.cartItems.length) {
      this.cartItems[index].cantidad = cantidad;
    }
  }

  // Registra un pedido en el backend
  createPedido(pedido: any): Observable<any> {
    return this.http.post(this.apiUrl, pedido);
  }

  // Registra un detalle de pedido en el backend
  createDetallePedido(detallePedido: any): Observable<any> {
    return this.http.post(this.detalleApiUrl, detallePedido);
  }

  // Envía todos los detalles del pedido
  enviarDetallesPedido(idPedido: number): Observable<any>[] {
    const detalles = this.cartItems.map((item) => ({
      id_pedido: idPedido,
      id_pizza: item.tipo === 'pizza' ? item.id : null,
      id_pizza_familiar: item.tipo === 'pizza' && item.tamano === 'familiar' ? item.id : null,
      id_pasta: item.tipo === 'pasta' ? item.id : null,
      id_entrada: item.tipo === 'entrada' ? item.id : null,
      cantidad: item.cantidad,
      precio_unitario: item.precio,
      subtotal: item.cantidad * item.precio,
    }));

    // Enviar cada detalle como una solicitud HTTP
    return detalles.map((detalle) => this.createDetallePedido(detalle));
  }
}
