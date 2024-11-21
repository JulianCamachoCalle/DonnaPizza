// src/app/models/pedido.model.ts
export interface Pedido {
    id_pedido: number;      // Identificador único del pedido
    id_usuario: number;     // ID del usuario que registró el pedido
    id_cliente: number;     // ID del cliente asociado al pedido
    fecha: string;          // Fecha del pedido (formato ISO 8601 o según tu API)
    total: number;          // Total del pedido
  }
  