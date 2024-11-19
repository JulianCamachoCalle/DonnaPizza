package com.example.DonnaPizza.MVC.Cliente;

import lombok.Data;

@Data
public class ClienteDTO {
    private String nombre;

    private String apellido;

    private String email;

    private String telefono;

    private String direccion;
}
