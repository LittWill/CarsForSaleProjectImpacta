package com.wnra.carsforsale.repository;

import com.wnra.carsforsale.domain.Anuncio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface AnuncioRepository extends JpaRepository<Anuncio, String> {

}
