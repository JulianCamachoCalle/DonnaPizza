package com.example.DonnaPizza.MVC.DetallesPedido;


import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping(path = "api/v1/detalles-pedido")
public class DetallesPedidoControlador {

    private final DetallesPedidoService detallesPedidoService;

    // Obtener todos
    @GetMapping
    Iterable<DetallesPedido> list() {
        return detallesPedidoService.findAll();
    }

    // Obtener por ID
    @GetMapping("{id_detallepedido}")
    public DetallesPedido get(@PathVariable Long id_detallepedido) {
        return detallesPedidoService.findById(id_detallepedido);
    }

    // Agregar
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public DetallesPedido create(@RequestBody DetallesPedidoDTO detallesPedidoDTO) {
        return detallesPedidoService.create(detallesPedidoDTO);
    }

    // Actualizar
    @PutMapping("{id_detallepedido}")
    public DetallesPedido update(@PathVariable Long id_detallepedido, @RequestBody DetallesPedidoDTO detallesPedidoDTO) {
        return detallesPedidoService.update(id_detallepedido, detallesPedidoDTO);
    }


    // Eliminar
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("{id_detallepedido}")
    public void delete(@PathVariable Long id_detallepedido) {
        detallesPedidoService.delete(id_detallepedido);
    }
}
