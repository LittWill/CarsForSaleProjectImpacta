package com.wnra.carsforsale.mapper;

import com.wnra.carsforsale.controller.usuario.dto.AtualizacaoSenhaDTO;
import com.wnra.carsforsale.controller.usuario.dto.EntradaUsuarioDTO;
import com.wnra.carsforsale.controller.usuario.dto.SaidaUsuarioDTO;
import com.wnra.carsforsale.domain.Usuario;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.springframework.stereotype.Component;

@Component
@Mapper(componentModel = "spring")
public interface UsuarioMapper {
    Usuario paraEntidade(EntradaUsuarioDTO entradaUsuarioDTO);

    SaidaUsuarioDTO paraSaida(Usuario usuario);

}