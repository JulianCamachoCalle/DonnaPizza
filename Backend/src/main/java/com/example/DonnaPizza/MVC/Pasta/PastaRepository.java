package com.example.DonnaPizza.MVC.Pasta;

import com.example.DonnaPizza.MVC.Pizzas.Pizzas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PastaRepository extends JpaRepository<Pasta,Long> {

    // Buscar Segun Nombre
    Optional<Pasta> findPastaByNombre(String nombre);
}
