package com.wnra.carsforsale.mapper;

import com.wnra.carsforsale.controller.marca.dto.EntradaMarcaDTO;
import com.wnra.carsforsale.controller.marca.dto.SaidaMarcaDTO;
import com.wnra.carsforsale.domain.Marca;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

@Component
@Mapper(componentModel = "spring")
public interface MarcaMapper {

    Marca paraEntidade(EntradaMarcaDTO entradaMarcaDTO);

    SaidaMarcaDTO paraSaidaDTO(Marca marca);
}
