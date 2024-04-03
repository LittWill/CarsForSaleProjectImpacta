package com.wnra.carsforsale.service;

import com.wnra.carsforsale.domain.Anuncio;
import com.wnra.carsforsale.domain.Marca;
import com.wnra.carsforsale.domain.Usuario;
import com.wnra.carsforsale.repository.AnuncioRepository;
import com.wnra.carsforsale.repository.MarcaRepository;
import com.wnra.carsforsale.repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AnuncioService {

    private final AnuncioRepository anuncioRepository;

    private final UsuarioRepository usuarioRepository;

    @Transactional
    public Anuncio salvarAnuncio(Anuncio anuncio) {
        anuncio.setDataPublicacao(LocalDateTime.now());
        anuncio.setAnunciante(Usuario.builder().id(usuarioRepository.findAll().get(0).getId()).build());
        return anuncioRepository.save(anuncio);
    }

    public List<Anuncio> listarAnuncios() {
        return anuncioRepository.findAll();
    }
}
