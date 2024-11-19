package com.example.DonnaPizza.MVC.Pedidos;

import com.example.DonnaPizza.Exception.ResourceNotFoundException;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class PedidosService {

    private final PedidosRepository pedidosRepository;

    // Obtener todos
    public Iterable<Pedidos> findAll() {
        return pedidosRepository.findAll();
    }

    // Obtener por ID
    public Pedidos findById(Long id_pedidos) {
        return pedidosRepository.findById(id_pedidos).orElseThrow(ResourceNotFoundException::new);
    }

    // Agregar
    public Pedidos create(PedidosDTO pedidosDTO) {
        ModelMapper mapper = new ModelMapper();
        Pedidos pedidos = mapper.map(pedidosDTO, Pedidos.class);
        return pedidosRepository.save(pedidos);
    }

    // Actualizar
    public Pedidos update(Long id_pedidos, PedidosDTO pedidosDTO) {
        Pedidos pedidosFromDB = findById(id_pedidos);

        ModelMapper mapper = new ModelMapper();
        mapper.map(pedidosDTO, pedidosFromDB);

        return pedidosRepository.save(pedidosFromDB);
    }

    // Eliminar
    public void delete(Long id_pedidos) {
        Pedidos pedidosFromDB = findById(id_pedidos);
        pedidosRepository.delete(pedidosFromDB);
    }
}
