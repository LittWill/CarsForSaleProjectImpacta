package com.wnra.carsforsale.service;

import com.wnra.carsforsale.domain.TokenRecuperacaoSenha;
import com.wnra.carsforsale.domain.Usuario;
import com.wnra.carsforsale.repository.TokenRecuperacaoSenhaRepository;
import com.wnra.carsforsale.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class TokenRecuperacaoSenhaService {

    private final UsuarioRepository usuarioRepository;

    private final TokenRecuperacaoSenhaRepository tokenRecuperacaoSenhaRepository;

    public TokenRecuperacaoSenha gerarToken(String emailUsuario){
        Usuario usuario = usuarioRepository.findByEmail(emailUsuario).orElseThrow();
        TokenRecuperacaoSenha tokenRecuperacaoSenha = TokenRecuperacaoSenha.builder()
                .dataExpiracao(LocalDateTime.now().plusMinutes(10))
                .codigo(String.valueOf(new Random().nextInt(10000, 999999)))
                .dataCriacao(LocalDateTime.now())
                .usuario(usuario)
                .build();

        //TODO: Implementar envio de email

        return tokenRecuperacaoSenhaRepository.save(tokenRecuperacaoSenha);
    }
}
