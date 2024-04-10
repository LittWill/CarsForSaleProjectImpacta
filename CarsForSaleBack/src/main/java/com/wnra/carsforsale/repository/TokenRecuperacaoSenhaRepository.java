package com.wnra.carsforsale.repository;

import com.wnra.carsforsale.domain.TokenRecuperacaoSenha;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TokenRecuperacaoSenhaRepository extends JpaRepository<TokenRecuperacaoSenha, String> {

    Optional<TokenRecuperacaoSenha> findByCodigo(String codigo);
}
