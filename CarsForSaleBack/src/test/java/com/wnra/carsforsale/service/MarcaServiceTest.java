package com.wnra.carsforsale.service;

import com.wnra.carsforsale.domain.Marca;
import com.wnra.carsforsale.repository.MarcaRepository;
import com.wnra.carsforsale.template.MarcaTemplate;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class MarcaServiceTest {

    @Mock
    MarcaRepository marcaRepository;

    @InjectMocks
    MarcaService marcaService;

    Marca marca = MarcaTemplate.marca();

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        when(marcaRepository.save(marca)).thenReturn(marca);
    }

    @Test
    void salvarMarca() {
        assertThat(marcaService.salvarMarca(marca)).isNotNull();
        verify(marcaRepository, Mockito.times(1)).save(marca);
    }

    @Test
    void buscarMarca() {
    }

    @Test
    void buscarMarcas() {
    }

    @Test
    void atualizarMarca() {
    }

    @Test
    void deletarMarca() {
    }
}