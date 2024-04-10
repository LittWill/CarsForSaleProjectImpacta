package com.wnra.carsforsale.controller.usuario;

import com.wnra.carsforsale.controller.usuario.dto.AtualizacaoSenhaDTO;
import com.wnra.carsforsale.controller.usuario.dto.EntradaUsuarioDTO;
import com.wnra.carsforsale.controller.usuario.dto.SaidaUsuarioDTO;
import com.wnra.carsforsale.mapper.UsuarioMapper;
import com.wnra.carsforsale.service.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("me")
    public ResponseEntity<SaidaUsuarioDTO> obterInformacoesUsuarioLogado(){
        return ResponseEntity.ok(usuarioMapper.paraSaida(usuarioService.obterUsuarioLogado()));
    }

    @PatchMapping
    public ResponseEntity<Void> atualizarSenha(@RequestBody AtualizacaoSenhaDTO atualizacaoSenhaDTO){
        usuarioService.alterarSenha(atualizacaoSenhaDTO.email(), atualizacaoSenhaDTO.codigoRecuperacao(), atualizacaoSenhaDTO.senhaNova());
        return ResponseEntity.noContent().build();
    }
}
