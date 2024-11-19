package com.example.DonnaPizza.MVC.Pagos;

import lombok.Data;

import java.util.Date;

@Data
public class PagosDTO {

    private Long id_pedido;

    private Long id_metodo_pago;

    private Double monto;

    private Date fecha;
}
