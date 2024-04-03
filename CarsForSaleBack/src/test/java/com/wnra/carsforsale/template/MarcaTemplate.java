package com.wnra.carsforsale.template;

import com.wnra.carsforsale.domain.Marca;

import java.time.LocalDateTime;
import java.util.UUID;

public class MarcaTemplate {
    public static Marca marca(){
        return Marca.builder()
                .nome("MARCA_NOME")
                .dataCriacao(LocalDateTime.now())
                .id(UUID.randomUUID().toString())
                .build();
    }
}
