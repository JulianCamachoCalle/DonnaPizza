package com.example.DonnaPizza.MVC.Pasta;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping(path = "api/v1/pastas")
public class PastaControlador {

    private final PastaService pastaService;

    // Obtener todos
    @GetMapping
    Iterable<Pasta> list() {
        return pastaService.findAll();
    }

    // Obtener por ID
    @GetMapping("{id_pasta}")
    public Pasta get(@PathVariable Long id_pasta) {
        return pastaService.findById(id_pasta);
    }

    // Agregar
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public Pasta create(@RequestBody PastaDTO pastaDTO) {
        return pastaService.create(pastaDTO);
    }

    // Actualizar
    @PutMapping("{id_pasta}")
    public Pasta update(@PathVariable Long id_pasta, @RequestBody PastaDTO pastaDTO) {
        return pastaService.update(id_pasta, pastaDTO);
    }


    // Eliminar
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("{id_pasta}")
    public void delete(@PathVariable Long id_pasta) {
        pastaService.delete(id_pasta);
    }
}