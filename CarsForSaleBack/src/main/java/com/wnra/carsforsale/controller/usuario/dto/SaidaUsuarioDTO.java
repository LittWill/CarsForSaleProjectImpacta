package com.wnra.carsforsale.controller.usuario.dto;

import java.io.Serializable;

/**
 * DTO for {@link com.wnra.carsforsale.domain.Usuario}
 */
public record SaidaUsuarioDTO(String primeiroNome, String ultimoNome, String email,
                              EnderecoDto endereco) implements Serializable {
    /**
     * DTO for {@link com.wnra.carsforsale.domain.Endereco}
     */
    public record EnderecoDto(String estado, String cidade) implements Serializable {
    }
}