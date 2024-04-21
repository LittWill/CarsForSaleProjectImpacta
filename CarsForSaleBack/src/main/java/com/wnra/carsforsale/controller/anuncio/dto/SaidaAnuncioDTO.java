package com.wnra.carsforsale.controller.anuncio.dto;

import com.wnra.carsforsale.domain.Anuncio;
import com.wnra.carsforsale.domain.Veiculo;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;

/**
 * DTO for {@link com.wnra.carsforsale.domain.Anuncio}
 */
public record SaidaAnuncioDTO(UUID id, VeiculoDto veiculo, BigDecimal valor, UsuarioDto anunciante,
                              Set<String> fotos, String descricao, LocalDateTime dataPublicacao,
                              Anuncio.TipoNegociacao tipoNegociacao, boolean ativo) implements Serializable {
    /**
     * DTO for {@link com.wnra.carsforsale.domain.Veiculo}
     */
    public record VeiculoDto(String modelo, MarcaDto marca, Double kmRodados, String ano,
                             Veiculo.TipoCombustivel tipoCombustivel, String cor) implements Serializable {
        /**
         * DTO for {@link com.wnra.carsforsale.domain.Marca}
         */
        public record MarcaDto(String nome, LocalDateTime dataCriacao, String foto) implements Serializable {
        }
    }

    /**
     * DTO for {@link com.wnra.carsforsale.domain.Usuario}
     */
    public record UsuarioDto(LocalDateTime dataCadastro, String primeiroNome, String ultimoNome, String email,
                             EnderecoDto endereco) implements Serializable {
        /**
         * DTO for {@link com.wnra.carsforsale.domain.Endereco}
         */
        public record EnderecoDto(String cep, String estado, String cidade, String endereco) implements Serializable {
        }
    }
}