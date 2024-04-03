package com.wnra.carsforsale.repository;

import com.wnra.carsforsale.domain.Marca;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface MarcaRepository extends JpaRepository<Marca, String> {
    Optional<Marca> findByNome(String nome);
}
