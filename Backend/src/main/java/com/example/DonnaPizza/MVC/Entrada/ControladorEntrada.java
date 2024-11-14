package com.example.DonnaPizza.MVC.Entrada;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
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
@RequestMapping(path =  "api/v1/entradas")
@CrossOrigin(origins = {"http://localhost:4200"})
public class ControladorEntrada {
        private final ServicioEntrada servicioEntrada;
        @Autowired
        public ControladorEntrada(ServicioEntrada servicioEntrada) {
            this.servicioEntrada = servicioEntrada;
        }
        @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
        public Entrada crearEntrada(@RequestBody Entrada entrada) {
            System.out.println("Entradando a crear");
            return servicioEntrada.crearEntrada(entrada);
        }
        @GetMapping("/{id}")
        public ResponseEntity<Entrada> obtenerEntradaPorId(@PathVariable Long id) {
            return servicioEntrada.obtenerEntradaPorId(id)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        }
        @GetMapping
        public List<Entrada> obtenerTodasLasEntradas() {
            return servicioEntrada.obtenerTodasLasEntradas();
        }
        @PutMapping("/{id}")
        public ResponseEntity<Entrada> actualizarEntrada(@PathVariable Long id, @RequestBody Entrada nuevaEntrada) {
            try {
                return ResponseEntity.ok(servicioEntrada.actualizarEntrada(id, nuevaEntrada));
            } catch (RuntimeException e) {
                return ResponseEntity.notFound().build();
            }
        }
        @DeleteMapping("/{id}")
        public ResponseEntity<Void> eliminarEntrada(@PathVariable Long id) {
            try {
                servicioEntrada.eliminarEntrada(id);
                return ResponseEntity.noContent().build();
            } catch (RuntimeException e) {
                return ResponseEntity.notFound().build();
            }
        }
    }