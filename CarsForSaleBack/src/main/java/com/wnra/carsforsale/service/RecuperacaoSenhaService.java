package com.wnra.carsforsale.service;

import com.wnra.carsforsale.domain.TokenRecuperacaoSenha;
import com.wnra.carsforsale.domain.Usuario;
import com.wnra.carsforsale.repository.TokenRecuperacaoSenhaRepository;
import com.wnra.carsforsale.repository.UsuarioRepository;
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

    @Value("${spring.mail.username}")
    private String username;

    public void gerarToken(String emailUsuario){
        Usuario usuario = usuarioRepository.findByEmail(emailUsuario).orElseThrow();
        TokenRecuperacaoSenha tokenRecuperacaoSenha = TokenRecuperacaoSenha.builder()
                .dataExpiracao(LocalDateTime.now().plusMinutes(10))
                .codigo(String.valueOf(new Random().nextInt(10000, 999999)))
                .dataCriacao(LocalDateTime.now())
                .usuario(usuario)
                .build();

        TokenRecuperacaoSenha token = tokenRecuperacaoSenhaRepository.save(tokenRecuperacaoSenha);

        String mensagem = """
                Olá, você solicitou recentemente uma redefinição de senha de acesso à Cars for Sale.
                Insira o código a seguir solicitado no painel de recuperação de senha:
                """;

        emailService.enviarEmail(username, "Cars for Sale: Código para recuperação de senha", mensagem + token.getCodigo() + ".");
    }
}
