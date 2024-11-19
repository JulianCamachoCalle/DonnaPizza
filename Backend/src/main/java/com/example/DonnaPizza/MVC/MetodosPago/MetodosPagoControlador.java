package com.example.DonnaPizza.MVC.MetodosPago;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping(path = "api/v1/metodosPago")
public class MetodosPagoControlador {

    private final MetodosPagoService metodosPagoService;

    // Obtener todos
    @GetMapping
    Iterable<MetodosPago> list() {
        return metodosPagoService.findAll();
    }

    // Obtener por ID
    @GetMapping("{id_metodosPago}")
    public MetodosPago get(@PathVariable Long id_metodosPago) {
        return metodosPagoService.findById(id_metodosPago);
    }

    // Agregar
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public MetodosPago create(@RequestBody MetodosPagoDTO metodosPagoDTO) {
        return metodosPagoService.create(metodosPagoDTO);
    }

    // Actualizar
    @PutMapping("{id_metodosPago}")
    public MetodosPago update(@PathVariable Long id_metodosPago, @RequestBody MetodosPagoDTO metodosPagoDTO) {
        return metodosPagoService.update(id_metodosPago, metodosPagoDTO);
    }


    // Eliminar
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("{id_metodosPago}")
    public void delete(@PathVariable Long id_metodosPago) {
        metodosPagoService.delete(id_metodosPago);
    }
}
