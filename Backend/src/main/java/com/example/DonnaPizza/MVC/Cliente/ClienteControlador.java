package com.example.DonnaPizza.MVC.Cliente;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping(path = "api/v1/clientes")
public class ClienteControlador {

    private final ClienteService clienteService;

    // Obtener todos
    @GetMapping
    Iterable<Cliente> list() {
        return clienteService.findAll();
    }

    // Obtener por ID
    @GetMapping("{id_cliente}")
    public Cliente get(@PathVariable Long id_cliente) {
        return clienteService.findById(id_cliente);
    }

    // Agregar
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public Cliente create(@RequestBody ClienteDTO clienteDTO) {
        return clienteService.create(clienteDTO);
    }

    // Actualizar
    @PutMapping("{id_cliente}")
    public Cliente update(@PathVariable Long id_cliente, @RequestBody ClienteDTO clienteDTO) {
        return clienteService.update(id_cliente, clienteDTO);
    }


    // Eliminar
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("{id_cliente}")
    public void delete(@PathVariable Long id_cliente) {
        clienteService.delete(id_cliente);
    }
}