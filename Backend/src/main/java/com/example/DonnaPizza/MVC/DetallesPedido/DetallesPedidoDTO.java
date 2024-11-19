package com.example.DonnaPizza.MVC.DetallesPedido;

import lombok.Data;

@Data
public class DetallesPedidoDTO {
    private Long id_pedido;

    private Long id_pizza;

    private Long id_pizza_familiar;

    private Long id_pasta;

    private Long id_entrada;

    private Integer cantidad;

    private Double precio_unitario;

    private Double subtotal;
}
