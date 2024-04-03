package com.wnra.carsforsale.controller.anuncio;

import com.wnra.carsforsale.controller.anuncio.dto.EntradaAnuncioDTO;
import com.wnra.carsforsale.controller.anuncio.dto.SaidaAnuncioDTO;
import com.wnra.carsforsale.domain.Anuncio;
import com.wnra.carsforsale.mapper.AnuncioMapper;
import com.wnra.carsforsale.service.AnuncioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;
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
    public ResponseEntity<List<SaidaAnuncioDTO>> listarAnuncios(@AuthenticationPrincipal OidcUser principal) {
        System.out.println(principal);
        List<SaidaAnuncioDTO> anuncios = anuncioService.listarAnuncios().stream().map(anuncioMapper::paraSaidaDTO).toList();
        String teste = "";
        return ResponseEntity.ok(anuncios);
    }

}
