package com.wnra.carsforsale.service;

import com.wnra.carsforsale.domain.TokenRecuperacaoSenha;
import com.wnra.carsforsale.domain.Usuario;
import com.wnra.carsforsale.handler.UsuarioLogadoHandler;
import com.wnra.carsforsale.repository.TokenRecuperacaoSenhaRepository;
import com.wnra.carsforsale.repository.UsuarioRepository;
import jakarta.persistence.EntityNotFoundException;
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

    private final TokenRecuperacaoSenhaRepository tokenRecuperacaoSenhaRepository;

    public Usuario salvarUsuario(Usuario usuario) {
        usuario.setDataCadastro(LocalDateTime.now());
        usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));
        return usuarioRepository.save(usuario);
    }

    public Usuario obterUsuarioLogado() {
        return usuarioLogadoHandler.obter();
    }

    public void alterarSenha(String email, String codigoRecuperacao, String senhaNova) {
        TokenRecuperacaoSenha tokenRecuperacaoSenha = tokenRecuperacaoSenhaRepository
                .findByCodigo(codigoRecuperacao)
                .orElseThrow(() -> new EntityNotFoundException("Código de recuperação não encontrado!"));

        if (tokenRecuperacaoSenha.getDataExpiracao().isBefore(LocalDateTime.now()) &&
                tokenRecuperacaoSenha.isUtilizado() &&
                !tokenRecuperacaoSenha.getUsuario().getEmail().equals(email)) {
            throw new IllegalArgumentException("Código de recuperação inválido!");
        }

        Usuario usuario = tokenRecuperacaoSenha.getUsuario();
        usuario.setSenha(passwordEncoder.encode(senhaNova));
        tokenRecuperacaoSenha.setUtilizado(true);
        tokenRecuperacaoSenha.setDataUtilizacao(LocalDateTime.now());

        usuarioRepository.save(usuario);
    }
}
