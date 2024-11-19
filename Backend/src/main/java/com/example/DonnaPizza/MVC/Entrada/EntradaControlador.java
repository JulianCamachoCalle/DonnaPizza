package com.example.DonnaPizza.MVC.Entrada;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping(path = "api/v1/entradas")
public class EntradaControlador {

    private final EntradaService entradaService;

    // Obtener todos
    @GetMapping
    Iterable<Entrada> list() {
        return entradaService.findAll();
    }

    // Obtener por ID
    @GetMapping("{id_entrada}")
    public Entrada get(@PathVariable Long id_entrada) {
        return entradaService.findById(id_entrada);
    }

    // Agregar
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public Entrada create(@RequestBody EntradaDTO entradaDTO) {
        return entradaService.create(entradaDTO);
    }

    // Actualizar
    @PutMapping("{id_entrada}")
    public Entrada update(@PathVariable Long id_entrada, @RequestBody EntradaDTO entradaDTO) {
        return entradaService.update(id_entrada, entradaDTO);
    }


    // Eliminar
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("{id_entrada}")
    public void delete(@PathVariable Long id_entrada) {
        entradaService.delete(id_entrada);
    }
}