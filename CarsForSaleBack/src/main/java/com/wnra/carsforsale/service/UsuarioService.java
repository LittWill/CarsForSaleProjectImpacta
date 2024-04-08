package com.wnra.carsforsale.service;

import com.wnra.carsforsale.domain.Usuario;
import com.wnra.carsforsale.handler.UsuarioLogadoHandler;
import com.wnra.carsforsale.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    private final PasswordEncoder passwordEncoder;

    private final UsuarioLogadoHandler usuarioLogadoHandler;

    public Usuario salvarUsuario(Usuario usuario){
        usuario.setDataCadastro(LocalDateTime.now());
        usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));
        return usuarioRepository.save(usuario);
    }

    public Usuario obterUsuarioLogado() {
        return usuarioLogadoHandler.obter();
    }
}
