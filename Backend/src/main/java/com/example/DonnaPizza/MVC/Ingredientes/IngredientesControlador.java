package com.example.DonnaPizza.MVC.Ingredientes;

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
@RequestMapping(path = "api/v1/ingredientes")
@CrossOrigin(origins = {"http://localhost:4200"})
public class IngredientesControlador {

    // Link al Servicio
    private final ServicioIngredientes servicioIngredientes;

    @Autowired
    public IngredientesControlador(ServicioIngredientes servicioIngredientes) {
        this.servicioIngredientes = servicioIngredientes;
    }

    // Obtener Todos
    @GetMapping
    public List<Ingredientes> getIngredientes() {
        return this.servicioIngredientes.getIngredientes();
    }

    // Obtener por Id
    @GetMapping("{ingredienteId}")
    public ResponseEntity<Ingredientes> getIngrediente(@PathVariable("ingredienteId") Long id) {
        Optional<Ingredientes> ingrediente = this.servicioIngredientes.getIngredienteById(id);
        if (ingrediente.isPresent()) {
            return ResponseEntity.ok(ingrediente.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Registrar Nuevo
    @PostMapping
    public ResponseEntity<Object> registrarIngrediente(@RequestBody Ingredientes ingredientes) {
        return this.servicioIngredientes.newIngrediente(ingredientes);
    }

    // Actualizar
    @PutMapping("/{id}")
    public ResponseEntity<Object> actualizarIngrediente(@PathVariable Long id, @RequestBody Ingredientes ingredientes) {
        return this.servicioIngredientes.updateIngrediente(id, ingredientes);
    }

    // Eliminar
    @DeleteMapping(path = "{ingredienteId}")
    public ResponseEntity<Object> eliminarIngrediente(@PathVariable("ingredienteId") Long id) {
        return this.servicioIngredientes.deleteIngrediente(id);
    }
}
