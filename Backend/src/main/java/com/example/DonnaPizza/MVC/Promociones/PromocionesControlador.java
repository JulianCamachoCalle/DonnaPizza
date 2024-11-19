package com.example.DonnaPizza.MVC.Promociones;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping(path = "api/v1/promociones")
public class PromocionesControlador {

    private final PromocionesServices promocionesServices;

    // Obtener todos
    @GetMapping
    Iterable<Promociones> list() {
        return promocionesServices.findAll();
    }

    // Obtener por ID
    @GetMapping("{id_promociones}")
    public Promociones get(@PathVariable Long id_promociones) {
        return promocionesServices.findById(id_promociones);
    }

    // Agregar
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public Promociones create(@RequestBody PromocionesDTO promocionesDTO) {
        return promocionesServices.create(promocionesDTO);
    }

    // Actualizar
    @PutMapping("{id_promociones}")
    public Promociones update(@PathVariable Long id_promociones, @RequestBody PromocionesDTO promocionesDTO) {
        return promocionesServices.update(id_promociones, promocionesDTO);
    }


    // Eliminar
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("{id_promociones}")
    public void delete(@PathVariable Long id_promociones) {
        promocionesServices.delete(id_promociones);
    }
}
