package com.wnra.carsforsale.mapper;

import com.wnra.carsforsale.controller.anuncio.dto.EntradaAnuncioDTO;
import com.wnra.carsforsale.controller.anuncio.dto.SaidaAnuncioDTO;
import com.wnra.carsforsale.domain.Anuncio;
import com.wnra.carsforsale.domain.FotoAnuncio;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

@Component
@Mapper(componentModel = "spring")
public interface AnuncioMapper {
    Anuncio paraEntidade(EntradaAnuncioDTO entradaAnuncioDTO);

    SaidaAnuncioDTO paraSaidaDTO(Anuncio anuncio);

    default FotoAnuncio to(String foto){
        return FotoAnuncio.builder().foto(foto).build();
    }

    default String to(FotoAnuncio foto){
        return foto.getFoto();
    }

}