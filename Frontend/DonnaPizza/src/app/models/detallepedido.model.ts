// src/app/models/pedido.model.ts
export interface DetallePedido {
  id_detalle: number;
  id_pedido: number;
  id_pizza: number ;
  id_pizza_familiar: number ;
  id_pasta: number ;
  id_entrada: number ;
  cantidad: number;
  precio_unitario: number;
  subtotal: number;
}
