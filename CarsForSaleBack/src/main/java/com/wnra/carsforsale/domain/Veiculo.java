package com.wnra.carsforsale.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Veiculo {

    @GeneratedValue(strategy = GenerationType.UUID)
    @Id
    private String id;

    @Column(nullable = false)
    private String modelo;

    @ManyToOne(optional = false)
    private Marca marca;

    @Column(nullable = false)
    private Double kmRodados;

    @Column(nullable = false)
    private String ano;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoCombustivel tipoCombustivel;

    @Column(nullable = false)
    private String cor;

    public enum TipoCombustivel {
        GASOLINA, DIESEL, FLEX, ELETRICO, HIBRIDO
    }


}
