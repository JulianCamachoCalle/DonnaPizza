package com.example.DonnaPizza.MVC.Pizzas;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping(path = "api/v1/pizzas")
public class PizzasControlador {

    private final PizzasService pizzasService;

    // Obtener todos
    @GetMapping
    Iterable<Pizzas> list() {
        return pizzasService.findAll();
    }

    // Obtener por ID
    @GetMapping("{id_pizza}")
    public Pizzas get(@PathVariable Long id_pizza) {
        return pizzasService.findById(id_pizza);
    }

    // Agregar
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public Pizzas create(@RequestBody PizzaDTO pizzaDTO) {
        return pizzasService.create(pizzaDTO);
    }

    // Actualizar
    @PutMapping("{id_pizza}")
    public Pizzas update(@PathVariable Long id_pizza, @RequestBody PizzaDTO pizzaDTO) {
        return pizzasService.update(id_pizza, pizzaDTO);
    }


    // Eliminar
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("{id_pizza}")
    public void delete(@PathVariable Long id_pizza) {
        pizzasService.delete(id_pizza);
    }
}
