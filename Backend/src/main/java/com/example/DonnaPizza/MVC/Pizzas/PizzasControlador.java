package com.example.DonnaPizza.MVC.Pizzas;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "api/v1/pizzas")
@CrossOrigin(origins = {"http://localhost:4200"})
public class PizzasControlador {

    // Link al Servicio
    private final ServicioPizzas servicioPizzas;

    @Autowired
    public PizzasControlador(ServicioPizzas servicioPizzas) {
        this.servicioPizzas = servicioPizzas;
    }

    // Obtener Todos
    @GetMapping
    public List<Pizzas> getPizzas() {
        return this.servicioPizzas.getPizzas();
    }

    // Obtener por Id
    @GetMapping("{pizzasId}")
    public ResponseEntity<Pizzas> getPizza(@PathVariable("pizzasId") Long id) {
        Optional<Pizzas> pizzas = this.servicioPizzas.getPizzaById(id);
        if (pizzas.isPresent()) {
            return ResponseEntity.ok(pizzas.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Registrar Nuevo
    @PostMapping
    public ResponseEntity<Object> registrarPizza(@RequestBody Pizzas pizza) {
        return this.servicioPizzas.newPizza(pizza);
    }

    // Actualizar
    @PutMapping("/{id}")
    public ResponseEntity<Object> actualizarPizza(@PathVariable Long id, @RequestBody Pizzas pizza) {
        return this.servicioPizzas.updatePizza(id, pizza);
    }

    // Eliminar
    @DeleteMapping(path = "{pizzasId}")
    public ResponseEntity<Object> eliminarPizza(@PathVariable("pizzasId") Long id) {
        return this.servicioPizzas.deletePizza(id);
    }
}
