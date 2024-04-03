package com.wnra.carsforsale.controller.usuario.dto;

import java.io.Serializable;

/**
 * DTO for {@link com.wnra.carsforsale.domain.Usuario}
 */
public record EntradaUsuarioDTO(String primeiroNome, String ultimoNome, String email, String senha,
                                EnderecoDto endereco) implements Serializable {
    /**
     * DTO for {@link com.wnra.carsforsale.domain.Endereco}
     */
    public record EnderecoDto(String cep, String estado, String cidade, String endereco,
                              String numero) implements Serializable {
    }
}