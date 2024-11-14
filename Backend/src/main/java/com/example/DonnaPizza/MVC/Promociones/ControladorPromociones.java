package com.example.DonnaPizza.MVC.Promociones;

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
//Desarrollo de anthony
@RestController
@RequestMapping(path = "api/v1/promociones")
@CrossOrigin(origins = {"http://localhost:4200"})
public class ControladorPromociones {

    // Link al Servicio
    private final ServicioPromociones servicioPromociones;

    @Autowired
    public ControladorPromociones(ServicioPromociones servicioPromociones) {
        this.servicioPromociones = servicioPromociones;
    }

    //Obtener Todos
    @GetMapping
    public List<Promociones> getPromociones() {
        return servicioPromociones.getPromociones();
    }

    // Obtener por Id
    @GetMapping("{promocionId}")
    public ResponseEntity<Promociones> getPromociones(@PathVariable("promocionId") Long id) {
        Optional<Promociones> promociones = this.servicioPromociones.getPromocionesById(id);
        if (promociones.isPresent()) {
            return ResponseEntity.ok(promociones.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Registrar Nuevo
    @PostMapping
    public ResponseEntity<Object> registrarPromocion(@RequestBody Promociones promociones) {
        return this.servicioPromociones.newPromociones(promociones);
    }

    // Actualizar
    @PutMapping("/{id}")
    public ResponseEntity<Object> actualizarPromocion(@PathVariable Long id, @RequestBody Promociones promociones) {
        return this.servicioPromociones.updatePromociones(id, promociones);
    }

    // Eliminar
    @DeleteMapping(path = "{promocionId}")
    public ResponseEntity<Object> eliminarPromocion(@PathVariable("promocionId") Long id) {
        return this.servicioPromociones.deletePromociones(id);
    }
}
