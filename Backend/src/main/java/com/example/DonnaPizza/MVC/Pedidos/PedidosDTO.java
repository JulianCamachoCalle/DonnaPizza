package com.example.DonnaPizza.MVC.Pedidos;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class PedidosDTO {

    private Long id_usuario;

    private Long id_cliente;

    private LocalDateTime fecha;

    private Double total;
}
