package com.example.DonnaPizza.MVC.DetallesPedido;

import com.example.DonnaPizza.Exception.ResourceNotFoundException;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;


@AllArgsConstructor
@Service
public class DetallesPedidoService {

    private final DetallesPedidoRepository detallesPedidoRepository;

    // Obtener todos
    public Iterable<DetallesPedido> findAll() {
        return detallesPedidoRepository.findAll();
    }

    // Obtener por ID
    public DetallesPedido findById(Long id_detallepedido) {
        return detallesPedidoRepository.findById(id_detallepedido).orElseThrow(ResourceNotFoundException::new);
    }

    // Agregar
    public DetallesPedido create(DetallesPedidoDTO detallesPedidoDTO) {
        ModelMapper mapper = new ModelMapper();
        DetallesPedido detallesPedido = mapper.map(detallesPedidoDTO, DetallesPedido.class);
        return detallesPedidoRepository.save(detallesPedido);
    }

    // Actualizar
    public DetallesPedido update(Long id_detallepedido, DetallesPedidoDTO detallesPedidoDTO) {
        DetallesPedido detallespedidoFromDB = findById(id_detallepedido);

        ModelMapper mapper = new ModelMapper();
        mapper.map(detallesPedidoDTO, detallespedidoFromDB);

        return detallesPedidoRepository.save(detallespedidoFromDB);
    }

    // Eliminar
    public void delete(Long id_detallepedido) {
        DetallesPedido detallespedidoFromDB = findById(id_detallepedido);
        detallesPedidoRepository.delete(detallespedidoFromDB);
    }
}
