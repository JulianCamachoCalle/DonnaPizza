package com.example.DonnaPizza.MVC.Ingredientes;


import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping(path = "api/v1/ingredientes")
public class IngredientesControlador {

    private final IngredientesService ingredientesService;

    // Obtener todos
    @GetMapping
    Iterable<Ingredientes> list() {
        return ingredientesService.findAll();
    }

    // Obtener por ID
    @GetMapping("{id_ingredientes}")
    public Ingredientes get(@PathVariable Long id_ingredientes) {
        return ingredientesService.findById(id_ingredientes);
    }

    // Agregar
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public Ingredientes create(@RequestBody IngredientesDTO ingredientesDTO) {
        return ingredientesService.create(ingredientesDTO);
    }

    // Actualizar
    @PutMapping("{id_ingredientes}")
    public Ingredientes update(@PathVariable Long id_ingredientes, @RequestBody IngredientesDTO ingredientesDTO) {
        return ingredientesService.update(id_ingredientes, ingredientesDTO);
    }


    // Eliminar
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("{id_ingredientes}")
    public void delete(@PathVariable Long id_ingredientes) {
        ingredientesService.delete(id_ingredientes);
    }
}
