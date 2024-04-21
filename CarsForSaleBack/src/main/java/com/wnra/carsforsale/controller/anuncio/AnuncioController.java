package com.wnra.carsforsale.controller.anuncio;

import com.wnra.carsforsale.controller.anuncio.dto.EntradaAnuncioDTO;
import com.wnra.carsforsale.controller.anuncio.dto.SaidaAnuncioDTO;
import com.wnra.carsforsale.domain.Anuncio;
import com.wnra.carsforsale.mapper.AnuncioMapper;
import com.wnra.carsforsale.service.AnuncioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<List<SaidaAnuncioDTO>> listarAnunciosAtivos() {
        List<SaidaAnuncioDTO> anuncios = anuncioService.listarAnunciosAtivos().stream().map(anuncioMapper::paraSaidaDTO).toList();
        return ResponseEntity.ok(anuncios);
    }

    @GetMapping("{id}")
    public ResponseEntity<SaidaAnuncioDTO> obterAnuncio(@PathVariable String id) {
        return ResponseEntity.ok(anuncioMapper.paraSaidaDTO(anuncioService.obterAnuncio(id)));
    }

    @GetMapping("me")
    public ResponseEntity<List<SaidaAnuncioDTO>> listarMeusAnuncios() {
        List<SaidaAnuncioDTO> anuncios = anuncioService.listarMeusAnuncios().stream().map(anuncioMapper::paraSaidaDTO).toList();
        return ResponseEntity.ok(anuncios);
    }

    @PatchMapping("toggleActive/{id}")
    public ResponseEntity<SaidaAnuncioDTO> alternarAtivacaoAnuncio(@PathVariable String id) {
        SaidaAnuncioDTO saidaAnuncioDTO = anuncioMapper.paraSaidaDTO(anuncioService.alternarAtivacaoAnuncio(id));
        return ResponseEntity.ok(saidaAnuncioDTO);
    }

}
