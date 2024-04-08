package com.wnra.carsforsale.controller.anuncio;

import com.wnra.carsforsale.controller.anuncio.dto.EntradaAnuncioDTO;
import com.wnra.carsforsale.controller.anuncio.dto.SaidaAnuncioDTO;
import com.wnra.carsforsale.domain.Anuncio;
import com.wnra.carsforsale.domain.Usuario;
import com.wnra.carsforsale.mapper.AnuncioMapper;
import com.wnra.carsforsale.service.AnuncioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("anuncios")
@RequiredArgsConstructor
public class AnuncioController {

    private final AnuncioService anuncioService;

    private final AnuncioMapper anuncioMapper;

    @PostMapping
    public ResponseEntity<SaidaAnuncioDTO> salvarAnuncio(@RequestBody EntradaAnuncioDTO entradaAnuncioDTO) {
        Anuncio anuncioSalvo = anuncioService.salvarAnuncio(anuncioMapper.paraEntidade(entradaAnuncioDTO));
        return ResponseEntity.status(HttpStatus.CREATED).body(anuncioMapper.paraSaidaDTO(anuncioSalvo));
    }

    @GetMapping
    public ResponseEntity<List<SaidaAnuncioDTO>> listarAnuncios() {
        List<SaidaAnuncioDTO> anuncios = anuncioService.listarAnuncios().stream().map(anuncioMapper::paraSaidaDTO).toList();
        return ResponseEntity.ok(anuncios);
    }

    @GetMapping("me")
    public ResponseEntity<List<SaidaAnuncioDTO>> listarMeusAnuncios() {
        List<SaidaAnuncioDTO> anuncios = anuncioService.listarMeusAnuncios().stream().map(anuncioMapper::paraSaidaDTO).toList();
        return ResponseEntity.ok(anuncios);
    }

}
