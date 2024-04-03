package com.wnra.carsforsale.mapper;

import com.wnra.carsforsale.controller.anuncio.dto.EntradaAnuncioDTO;
import com.wnra.carsforsale.controller.anuncio.dto.SaidaAnuncioDTO;
import com.wnra.carsforsale.controller.usuario.dto.EntradaUsuarioDTO;
import com.wnra.carsforsale.domain.Anuncio;
import com.wnra.carsforsale.domain.FotoAnuncio;
import com.wnra.carsforsale.domain.Usuario;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

@Component
@Mapper(componentModel = "spring")
public interface UsuarioMapper {
    Usuario paraEntidade(EntradaUsuarioDTO entradaUsuarioDTO);


}