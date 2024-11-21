// src/app/models/pedido.model.ts
export interface DetallePedido {
  id_detalle: number;
  id_pedido: number;
  id_pizza: number | null;
  id_pizza_familiar: number | null;
  id_pasta: number | null;
  id_entrada: number | null;
  cantidad: number;
  precio_unitario: number;
  subtotal: number;
}
