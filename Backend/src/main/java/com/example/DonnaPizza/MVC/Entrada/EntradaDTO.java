package com.example.DonnaPizza.MVC.Entrada;

import lombok.Data;

@Data
public class EntradaDTO {

    public String nombre;
    public String descripcion;
    public Double precio;
    public Boolean disponible;
}
