package com.wnra.carsforsale.repository;

import com.wnra.carsforsale.domain.Anuncio;
import com.wnra.carsforsale.domain.Usuario;
import com.wnra.carsforsale.domain.Veiculo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface AnuncioRepository extends JpaRepository<Anuncio, String> {

    List<Anuncio> findByAnunciante(Usuario usuario);

    List<Anuncio> findAllByAtivoIsTrue();
    @Query("SELECT a FROM Anuncio a " +
            "WHERE (:modelo IS NULL OR a.veiculo.modelo LIKE %:modelo% OR (:marca IS NULL OR a.veiculo.marca.nome LIKE %:marca%)) " +
            "AND (:valorMin IS NULL OR a.valor >= :valorMin) " +
            "AND (:valorMax IS NULL OR a.valor <= :valorMax) " +
            "AND (:tipoNegociacao IS NULL OR a.tipoNegociacao = :tipoNegociacao) " +
            "AND (:kmMin IS NULL OR a.veiculo.kmRodados >= :kmMin) " +
            "AND (:kmMax IS NULL OR a.veiculo.kmRodados <= : kmMax) " +
            "AND (:tipoCombustivel IS NULL OR a.veiculo.tipoCombustivel = :tipoCombustivel) " +
            "AND (:anoMin IS NULL OR a.veiculo.ano >= :anoMin) " +
            "AND (:anoMax IS NULL OR a.veiculo.ano <= :anoMax) " +
            "AND (:cor IS NULL OR a.veiculo.cor = :cor) " +
            "AND (a.ativo = true) "

    )
    List<Anuncio> findAllByFilters(String modelo,
                                   String marca,
                                   BigDecimal valorMin,
                                   BigDecimal valorMax,
                                   Anuncio.TipoNegociacao tipoNegociacao,
                                   Double kmMin,
                                   Double kmMax,
                                   Veiculo.TipoCombustivel tipoCombustivel,
                                   String anoMin,
                                   String anoMax,
                                   String cor
                                   );

}
