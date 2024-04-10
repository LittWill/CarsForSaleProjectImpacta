package com.wnra.carsforsale.controller.usuario.dto;

import java.io.Serializable;

/**
 * DTO for {@link com.wnra.carsforsale.domain.Usuario}
 */
public record AtualizacaoSenhaDTO(String email, String codigoRecuperacao, String senhaNova) implements Serializable {
}