package com.wnra.carsforsale.controller.token;

import com.wnra.carsforsale.service.RecuperacaoSenhaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("recuperacao-senha")
public class RecuperacaoSenhaController {

    private final RecuperacaoSenhaService recuperacaoSenhaService;

    @PostMapping("{email}")
    public ResponseEntity<Void> gerarToken(@PathVariable String email){
         recuperacaoSenhaService.gerarToken(email);
         return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("validar/{codigo}")
    public ResponseEntity<Void> validarToken(@PathVariable String codigo){
        recuperacaoSenhaService.validarToken(codigo);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

}
