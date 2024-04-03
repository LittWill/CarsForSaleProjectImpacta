package com.wnra.carsforsale.controller.anuncio.dto;

import com.wnra.carsforsale.domain.Anuncio;
import com.wnra.carsforsale.domain.Veiculo;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Set;
import java.util.UUID;

/**
 * DTO for {@link com.wnra.carsforsale.domain.Anuncio}
 */
public record EntradaAnuncioDTO(VeiculoDto veiculo, BigDecimal valor, UsuarioDto anunciante, Set<String> fotos,
                                String descricao, Anuncio.TipoNegociacao tipoNegociacao) implements Serializable {
    /**
     * DTO for {@link com.wnra.carsforsale.domain.Veiculo}
     */
    public record VeiculoDto(String modelo, MarcaDto marca, Double kmRodados, String ano,
                             Veiculo.TipoCombustivel tipoCombustivel, String cor) implements Serializable {
        /**
         * DTO for {@link com.wnra.carsforsale.domain.Marca}
         */
        public record MarcaDto(UUID id) implements Serializable {
            public MarcaDto(String id){
                this(UUID.fromString(id));
            }
        }
    }

    /**
     * DTO for {@link com.wnra.carsforsale.domain.Usuario}
     */
    public record UsuarioDto(UUID id) implements Serializable {
    }
}