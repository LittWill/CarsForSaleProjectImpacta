package com.wnra.carsforsale.controller.marca;

import com.wnra.carsforsale.controller.marca.dto.EntradaMarcaDTO;
import com.wnra.carsforsale.controller.marca.dto.SaidaMarcaDTO;
import com.wnra.carsforsale.domain.Marca;
import com.wnra.carsforsale.mapper.MarcaMapper;
import com.wnra.carsforsale.service.MarcaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("marcas")
@RequiredArgsConstructor
public class MarcaController {

    private final MarcaService marcaService;

    private final MarcaMapper marcaMapper;

    @GetMapping
    public ResponseEntity<List<SaidaMarcaDTO>> buscarMarcas() {
        List<SaidaMarcaDTO> marcas = marcaService.buscarMarcas().stream().map(marcaMapper::paraSaidaDTO).toList();
        return ResponseEntity.ok(marcas);
    }
}
