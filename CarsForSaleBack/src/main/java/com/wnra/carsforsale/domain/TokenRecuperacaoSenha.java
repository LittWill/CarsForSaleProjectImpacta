package com.wnra.carsforsale.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TokenRecuperacaoSenha {

    @GeneratedValue(strategy = GenerationType.UUID)
    @Id
    private String id;

    @ManyToOne
    private Usuario usuario;

    @Column(nullable = false)
    private LocalDateTime dataCriacao;

    @Column(nullable = false)
    private LocalDateTime dataExpiracao;

    @Column(nullable = true)
    private LocalDateTime dataUtilizacao;

    @Column(nullable = false)
    private String codigo;

    @Column(nullable = false)
    private boolean utilizado;


}
