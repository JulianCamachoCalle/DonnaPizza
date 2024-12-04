package com.example.DonnaPizza.MVC.Pasta;

import lombok.Data;

@Data
public class PastaDTO {

    public String descripcion;
    private String nombre;
    public Double precio;
    public Boolean disponible;
}
