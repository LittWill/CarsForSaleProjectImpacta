package com.wnra.carsforsale.handler;

import com.wnra.carsforsale.domain.Usuario;
import com.wnra.carsforsale.repository.UsuarioRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UsuarioLogadoHandler {

    private final UsuarioRepository usuarioRepository;

    public Usuario obter(){
        String emailUsuario = SecurityContextHolder.getContext().getAuthentication().getName();
        return usuarioRepository.findByEmail(emailUsuario).orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado!"));
    }
}
