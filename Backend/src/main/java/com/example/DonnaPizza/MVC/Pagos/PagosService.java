package com.example.DonnaPizza.MVC.Pagos;

import com.example.DonnaPizza.Exception.ResourceNotFoundException;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class PagosService {

    private final PagosRepository pagosRepository;

    // Obtener todos
    public Iterable<Pagos> findAll() {
        return pagosRepository.findAll();
    }

    // Obtener por ID
    public Pagos findById(Long id_pagos) {
        return pagosRepository.findById(id_pagos).orElseThrow(ResourceNotFoundException::new);
    }

    // Agregar
    public Pagos create(PagosDTO pagosDTO) {
        ModelMapper mapper = new ModelMapper();
        Pagos pagos = mapper.map(pagosDTO, Pagos.class);
        return pagosRepository.save(pagos);
    }

    // Actualizar
    public Pagos update(Long id_pagos, PagosDTO pagosDTO) {
        Pagos pagosFromDB = findById(id_pagos);

        ModelMapper mapper = new ModelMapper();
        mapper.map(pagosDTO, pagosFromDB);

        return pagosRepository.save(pagosFromDB);
    }

    // Eliminar
    public void delete(Long id_pagos) {
        Pagos pagosFromDB = findById(id_pagos);
        pagosRepository.delete(pagosFromDB);
    }
}
