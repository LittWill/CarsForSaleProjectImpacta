package com.wnra.carsforsale.service;

import com.google.api.gax.rpc.NotFoundException;
import com.wnra.carsforsale.domain.Anuncio;
import com.wnra.carsforsale.domain.Usuario;
import com.wnra.carsforsale.handler.UsuarioLogadoHandler;
import com.wnra.carsforsale.repository.AnuncioRepository;
import com.wnra.carsforsale.repository.UsuarioRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AnuncioService {

    private final AnuncioRepository anuncioRepository;

    private final UsuarioLogadoHandler usuarioLogadoHandler;

    @Transactional
    public Anuncio salvarAnuncio(Anuncio anuncio) {
        anuncio.setDataPublicacao(LocalDateTime.now());
        anuncio.setAnunciante(usuarioLogadoHandler.obter());
        return anuncioRepository.save(anuncio);
    }

    public List<Anuncio> listarAnuncios() {
        return anuncioRepository.findAll();
    }

    public List<Anuncio> listarMeusAnuncios() {
        return anuncioRepository.findByAnunciante(usuarioLogadoHandler.obter());
    }

}
