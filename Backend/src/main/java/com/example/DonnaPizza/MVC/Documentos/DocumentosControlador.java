package com.example.DonnaPizza.MVC.Documentos;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping(path = "api/v1/documentos")
public class DocumentosControlador {

    private final DocumentosService documentosService;

    // Obtener todos
    @GetMapping
    Iterable<Documentos> list() {
        return documentosService.findAll();
    }

    // Obtener por ID
    @GetMapping("{id_documentos}")
    public Documentos get(@PathVariable Long id_documentos) {
        return documentosService.findById(id_documentos);
    }

    // Agregar
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public Documentos create(@RequestBody DocumentosDTO documentosDTO) {
        return documentosService.create(documentosDTO);
    }

    // Actualizar
    @PutMapping("{id_documentos}")
    public Documentos update(@PathVariable Long id_documentos, @RequestBody DocumentosDTO documentosDTO) {
        return documentosService.update(id_documentos, documentosDTO);
    }


    // Eliminar
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("{id_documentos}")
    public void delete(@PathVariable Long id_documentos) {
        documentosService.delete(id_documentos);
    }

}