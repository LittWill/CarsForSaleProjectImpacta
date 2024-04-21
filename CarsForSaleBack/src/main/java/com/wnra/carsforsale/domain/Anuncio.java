package com.wnra.carsforsale.domain;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Anuncio {

    @GeneratedValue(strategy = GenerationType.UUID)
    @Id
    private String id;

    @OneToOne(cascade = CascadeType.PERSIST, optional = false)
    @JoinColumn(name = "veiculo_id")
    private Veiculo veiculo;

    @Column(nullable = false)
    private BigDecimal valor;

    @ManyToOne(optional = false)
    private Usuario anunciante;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "anuncio_id")
    private Set<FotoAnuncio> fotos;

    @Column(nullable = false)
    private String descricao;

    @Column(nullable = false)
    private LocalDateTime dataPublicacao;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoNegociacao tipoNegociacao;

    @Column(nullable = false)
    private boolean ativo;


    public enum TipoNegociacao {
        VENDA, TROCA, AMBOS
    }
}
