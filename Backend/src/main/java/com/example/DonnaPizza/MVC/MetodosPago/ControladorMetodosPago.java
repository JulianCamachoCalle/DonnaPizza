package com.example.DonnaPizza.MVC.MetodosPago;

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
@RequestMapping(path = "api/v1/metodosPago")
@CrossOrigin(origins = {"http://localhost:4200"})
public class ControladorMetodosPago {

    // Link al Servicio
    private final ServicioMetodosPago servicioMetodosPago;

    @Autowired
    public ControladorMetodosPago(ServicioMetodosPago servicioMetodosPago) {
        this.servicioMetodosPago = servicioMetodosPago;
    }

    //Obtener Todos
    @GetMapping
    public List<MetodosPago> getMetodosPago() {
        return servicioMetodosPago.getMetodosPago();
    }

    // Obtener por Id
    @GetMapping("{metodosPagoId}")
    public ResponseEntity<MetodosPago> getMetodosPago(@PathVariable("metodosPagoId") Long id) {
        Optional<MetodosPago> metodosPago = this.servicioMetodosPago.getMetodosPagoById(id);
        if (metodosPago.isPresent()) {
            return ResponseEntity.ok(metodosPago.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Registrar Nuevo
    @PostMapping
    public ResponseEntity<Object> registrarMetodosPago(@RequestBody MetodosPago metodosPago) {
        return this.servicioMetodosPago.newMetodosPago(metodosPago);
    }

    // Actualizar
    @PutMapping("/{id}")
    public ResponseEntity<Object> actualizarMetodosPago(@PathVariable Long id, @RequestBody MetodosPago metodosPago) {
        return this.servicioMetodosPago.updateMetodosPago(id, metodosPago);
    }

    // Eliminar
    @DeleteMapping(path = "{metodosPagoId}")
    public ResponseEntity<Object> eliminarMetodosPago(@PathVariable("metodosPagoId") Long id) {
        return this.servicioMetodosPago.deleteMetodosPago(id);
    }
}
