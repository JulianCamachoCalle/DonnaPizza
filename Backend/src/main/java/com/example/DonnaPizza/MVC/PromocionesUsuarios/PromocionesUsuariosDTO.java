package com.example.DonnaPizza.MVC.PromocionesUsuarios;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class PromocionesUsuariosDTO {

    private Long idUsuario;

    private Long idPromocion;

    private LocalDateTime fechaAplicacion;

    private String estado;
}
