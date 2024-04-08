package com.wnra.carsforsale.service;

import com.wnra.carsforsale.domain.Marca;
import com.wnra.carsforsale.repository.MarcaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MarcaService {

    private final MarcaRepository marcaRepository;

    public List<Marca> buscarMarcas() {
        return marcaRepository.findAll();
    }


}
