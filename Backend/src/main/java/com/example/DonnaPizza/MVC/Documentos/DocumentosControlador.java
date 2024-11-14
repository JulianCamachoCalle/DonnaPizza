package com.example.DonnaPizza.MVC.Documentos;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "api/v1/documentos")
@CrossOrigin(origins = {"http://localhost:4200"})
public class DocumentosControlador {


    private final ServicioDocumentos servicioDocumentos;

    @Autowired
    public DocumentosControlador(ServicioDocumentos servicioDocumentos) {
        this.servicioDocumentos = servicioDocumentos;
    }


    // Obtener Todos
    @GetMapping
    public List<Documentos> getDocumentos() {
        return this.servicioDocumentos.getDocumentos();
    }

    // Obtener por Id
    @GetMapping("{documentoId}")
    public ResponseEntity<Documentos> getDocumnetos(@PathVariable("documentoId") Long id) {
        Optional<Documentos> documentos = this.servicioDocumentos.getDocumentosById(id);
        if (documentos.isPresent()) {
            return ResponseEntity.ok(documentos.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Registrar Nuevo
    @PostMapping
    public ResponseEntity<Object> registrarDocumento(@RequestBody Documentos documentos) {
        return this.servicioDocumentos.newDocumento(documentos);
    }

    // Actualizar
    @PutMapping("/{id}")
    public ResponseEntity<Object> actualizarDocumento(@PathVariable Long id, @RequestBody Documentos documentos) {
        return this.servicioDocumentos.updateDocumentos(id,documentos);
    }

    // Eliminar
    @DeleteMapping(path = "{documentoId}")
    public ResponseEntity<Object> eliminarDocumento(@PathVariable("documentoId") Long id) {
        return this.servicioDocumentos.deleteDocumento(id);
    }
}