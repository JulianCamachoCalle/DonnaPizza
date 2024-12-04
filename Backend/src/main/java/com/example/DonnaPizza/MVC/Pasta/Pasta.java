package com.example.DonnaPizza.MVC.Pasta;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "pastas")
public class Pasta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long  id_pasta;
    private String nombre;
    public String descripcion;
    public Double precio;
    public Boolean disponible;
}
