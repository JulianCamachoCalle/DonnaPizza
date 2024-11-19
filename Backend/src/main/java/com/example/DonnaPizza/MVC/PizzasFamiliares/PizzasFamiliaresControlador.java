package com.example.DonnaPizza.MVC.PizzasFamiliares;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping(path = "api/v1/pizzasfamiliares")
public class PizzasFamiliaresControlador {

    private final PizzasFamiliaresService pizzasFamiliaresService;

    // Obtener todos
    @GetMapping
    Iterable<PizzasFamiliares> list() {
        return pizzasFamiliaresService.findAll();
    }

    // Obtener por ID
    @GetMapping("{id_pizzasFamiliares}")
    public PizzasFamiliares get(@PathVariable Long id_pizzasFamiliares) {
        return pizzasFamiliaresService.findById(id_pizzasFamiliares);
    }

    // Agregar
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public PizzasFamiliares create(@RequestBody PizzasFamiliaresDTO pizzasFamiliaresDTO) {
        return pizzasFamiliaresService.create(pizzasFamiliaresDTO);
    }

    // Actualizar
    @PutMapping("{id_pizzasFamiliares}")
    public PizzasFamiliares update(@PathVariable Long id_pizzasFamiliares, @RequestBody PizzasFamiliaresDTO pizzasFamiliaresDTO) {
        return pizzasFamiliaresService.update(id_pizzasFamiliares, pizzasFamiliaresDTO);
    }


    // Eliminar
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("{id_pizzasFamiliares}")
    public void delete(@PathVariable Long id_pizzasFamiliares) {
        pizzasFamiliaresService.delete(id_pizzasFamiliares);
    }
}
