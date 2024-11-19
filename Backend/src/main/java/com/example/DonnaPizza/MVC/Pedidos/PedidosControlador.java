package com.example.DonnaPizza.MVC.Pedidos;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping(path = "api/v1/pedidos")
public class PedidosControlador {

    private final PedidosService pedidosService;

    // Obtener todos
    @GetMapping
    Iterable<Pedidos> list() {
        return pedidosService.findAll();
    }

    // Obtener por ID
    @GetMapping("{id_pedidos}")
    public Pedidos get(@PathVariable Long id_pedidos) {
        return pedidosService.findById(id_pedidos);
    }

    // Agregar
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public Pedidos create(@RequestBody PedidosDTO pedidosDTO) {
        return pedidosService.create(pedidosDTO);
    }

    // Actualizar
    @PutMapping("{id_pedidos}")
    public Pedidos update(@PathVariable Long id_pedidos, @RequestBody PedidosDTO pedidosDTO) {
        return pedidosService.update(id_pedidos, pedidosDTO);
    }


    // Eliminar
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("{id_pedidos}")
    public void delete(@PathVariable Long id_pedidos) {
        pedidosService.delete(id_pedidos);
    }
}
