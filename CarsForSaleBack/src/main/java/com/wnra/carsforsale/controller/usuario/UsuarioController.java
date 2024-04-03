package com.wnra.carsforsale.controller.usuario;

import com.wnra.carsforsale.controller.usuario.dto.EntradaUsuarioDTO;
import com.wnra.carsforsale.mapper.UsuarioMapper;
import com.wnra.carsforsale.service.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("usuarios")
@RequiredArgsConstructor
public class UsuarioController {

    private final UsuarioService usuarioService;

    private final UsuarioMapper usuarioMapper;

    @PostMapping
    public ResponseEntity<Void> salvarUsuario(@RequestBody EntradaUsuarioDTO entradaUsuarioDTO){
        usuarioService.salvarUsuario(usuarioMapper.paraEntidade(entradaUsuarioDTO));
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
