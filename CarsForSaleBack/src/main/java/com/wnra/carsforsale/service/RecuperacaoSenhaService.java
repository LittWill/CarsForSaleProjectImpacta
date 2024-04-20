package com.wnra.carsforsale.service;

import com.wnra.carsforsale.domain.TokenRecuperacaoSenha;
import com.wnra.carsforsale.domain.Usuario;
import com.wnra.carsforsale.repository.TokenRecuperacaoSenhaRepository;
import com.wnra.carsforsale.repository.UsuarioRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class RecuperacaoSenhaService {

    private final UsuarioRepository usuarioRepository;

    private final TokenRecuperacaoSenhaRepository tokenRecuperacaoSenhaRepository;

    private final EmailService emailService;

    public void gerarToken(String emailUsuario) {
        Usuario usuario = usuarioRepository.findByEmail(emailUsuario).orElseThrow();
        TokenRecuperacaoSenha tokenRecuperacaoSenha = TokenRecuperacaoSenha.builder()
                .dataExpiracao(LocalDateTime.now().plusMinutes(10))
                .codigo(String.valueOf(new Random().nextInt(100000, 999999)))
                .dataCriacao(LocalDateTime.now())
                .usuario(usuario)
                .build();

        TokenRecuperacaoSenha token = tokenRecuperacaoSenhaRepository.save(tokenRecuperacaoSenha);

        String mensagem = """
                Olá, você solicitou recentemente uma redefinição de senha de acesso à Cars for Sale.
                Insira o código a seguir solicitado no painel de recuperação de senha:
                """;

        emailService.enviarEmail(emailUsuario, "Cars for Sale: Código para recuperação de senha", mensagem + token.getCodigo() + ".");
    }

    public void validarToken(String codigo) {
        TokenRecuperacaoSenha tokenRecuperacaoSenha = tokenRecuperacaoSenhaRepository
                .findByCodigo(codigo)
                .orElseThrow(() -> new EntityNotFoundException("Código de recuperação não encontrado!"));

        if (tokenRecuperacaoSenha.getDataExpiracao().isBefore(LocalDateTime.now()) &&
                tokenRecuperacaoSenha.isUtilizado()) {
            throw new IllegalArgumentException("Código de recuperação inválido!");
        }
    }
}
