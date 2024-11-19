package com.example.DonnaPizza.MVC.Promociones;

import lombok.Data;

@Data
public class PromocionesDTO {

    private String nombre;

    private String descripcion;

    private Double descuento;

    private String requisitos;

    private Boolean activo;
}
