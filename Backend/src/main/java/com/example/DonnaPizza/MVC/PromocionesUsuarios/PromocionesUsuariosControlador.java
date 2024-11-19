package com.example.DonnaPizza.MVC.PromocionesUsuarios;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping(path = "api/v1/promocionesusuarios")
public class PromocionesUsuariosControlador {

    private final PromocionesUsuariosService promocionesUsuariosService;

    // Obtener todos
    @GetMapping
    Iterable<PromocionesUsuarios> list() {
        return promocionesUsuariosService.findAll();
    }

    // Obtener por ID
    @GetMapping("{id_promocionesUsuarios}")
    public PromocionesUsuarios get(@PathVariable Long id_promocionesUsuarios) {
        return promocionesUsuariosService.findById(id_promocionesUsuarios);
    }

    // Agregar
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public PromocionesUsuarios create(@RequestBody PromocionesUsuariosDTO promocionesUsuariosDTO) {
        return promocionesUsuariosService.create(promocionesUsuariosDTO);
    }

    // Actualizar
    @PutMapping("{id_promocionesUsuarios}")
    public PromocionesUsuarios update(@PathVariable Long id_promocionesUsuarios, @RequestBody PromocionesUsuariosDTO promocionesUsuariosDTO) {
        return promocionesUsuariosService.update(id_promocionesUsuarios, promocionesUsuariosDTO);
    }


    // Eliminar
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("{id_promocionesUsuarios}")
    public void delete(@PathVariable Long id_promocionesUsuarios) {
        promocionesUsuariosService.delete(id_promocionesUsuarios);
    }
}
