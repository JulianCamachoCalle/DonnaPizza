package com.example.DonnaPizza.MVC.Pagos;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping(path = "api/v1/pagos")
public class PagosControlador {

    private final PagosService pagosService;

    // Obtener todos
    @GetMapping
    Iterable<Pagos> list() {
        return pagosService.findAll();
    }

    // Obtener por ID
    @GetMapping("{id_pagos}")
    public Pagos get(@PathVariable Long id_pagos) {
        return pagosService.findById(id_pagos);
    }

    // Agregar
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public Pagos create(@RequestBody PagosDTO pagosDTO) {
        return pagosService.create(pagosDTO);
    }

    // Actualizar
    @PutMapping("{id_pagos}")
    public Pagos update(@PathVariable Long id_pagos, @RequestBody PagosDTO pagosDTO) {
        return pagosService.update(id_pagos, pagosDTO);
    }


    // Eliminar
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("{id_pagos}")
    public void delete(@PathVariable Long id_pagos) {
        pagosService.delete(id_pagos);
    }
}
