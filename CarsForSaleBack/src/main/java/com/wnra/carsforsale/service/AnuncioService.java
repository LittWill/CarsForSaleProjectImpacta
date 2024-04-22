package com.wnra.carsforsale.service;

import com.wnra.carsforsale.controller.anuncio.dto.SaidaAnuncioDTO;
import com.wnra.carsforsale.domain.Anuncio;
import com.wnra.carsforsale.handler.UsuarioLogadoHandler;
import com.wnra.carsforsale.repository.AnuncioRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
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
        anuncio.setAtivo(true);
        return anuncioRepository.save(anuncio);
    }

    public List<Anuncio> listarAnunciosAtivos() {
        return anuncioRepository.findAllByAtivoIsTrue();
    }

    public List<Anuncio> listarMeusAnuncios() {
        return anuncioRepository.findByAnunciante(usuarioLogadoHandler.obter());
    }

    public Anuncio alternarAtivacaoAnuncio(String id) {
        Anuncio anuncio = anuncioRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Anuncio não encontrado!"));
        anuncio.setAtivo(!anuncio.isAtivo());
        anuncioRepository.save(anuncio);
        return anuncio;
    }

    public Anuncio obterAnuncio(String id) {
        return anuncioRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Anúncio não encontrado!"));
    }

    public void atualizarAnuncio(String id, Anuncio anuncioAtualizado){
        obterAnuncio(id);
        anuncioAtualizado.setId(id);
        anuncioRepository.save(anuncioAtualizado);
    }
}
