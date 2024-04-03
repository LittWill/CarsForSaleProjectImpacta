package com.wnra.carsforsale.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class FotoAnuncio {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false, columnDefinition = "TEXT(65000)")
    private String foto;

    @ManyToOne
    private Anuncio anuncio;
}
