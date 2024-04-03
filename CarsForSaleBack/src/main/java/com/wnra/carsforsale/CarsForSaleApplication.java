package com.wnra.carsforsale;

import com.wnra.carsforsale.domain.*;
import com.wnra.carsforsale.repository.AnuncioRepository;
import com.wnra.carsforsale.repository.MarcaRepository;
import com.wnra.carsforsale.repository.UsuarioRepository;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Set;
import java.util.UUID;

@SpringBootApplication
@RequiredArgsConstructor
public class CarsForSaleApplication implements CommandLineRunner {

	private final AnuncioRepository anuncioRepository;

	private final MarcaRepository marcaRepository;

	private final UsuarioRepository usuarioRepository;

	public static void main(String[] args) {
		SpringApplication.run(CarsForSaleApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		Marca toyota = Marca.builder().nome("Toyota").dataCriacao(LocalDateTime.now()).build();
		Marca honda = Marca.builder().nome("Honda").dataCriacao(LocalDateTime.now()).build();
		Marca ford = Marca.builder().nome("Ford").dataCriacao(LocalDateTime.now()).build();
		Marca chevrolet = Marca.builder().nome("Chevrolet").dataCriacao(LocalDateTime.now()).build();
		Marca volkswagen = Marca.builder().nome("Volkswagen").dataCriacao(LocalDateTime.now()).build();
		Marca bmw = Marca.builder().nome("BMW").dataCriacao(LocalDateTime.now()).build();
		Marca mercedes = Marca.builder().nome("Mercedes-Benz").dataCriacao(LocalDateTime.now()).build();
		Marca audi = Marca.builder().nome("Audi").dataCriacao(LocalDateTime.now()).build();
		Marca nissan = Marca.builder().nome("Nissan").dataCriacao(LocalDateTime.now()).build();
		Marca hyundai = Marca.builder().nome("Hyundai").dataCriacao(LocalDateTime.now()).build();

		Usuario wilson = Usuario.builder()
				.id("1")
				.email("wilson@email.com")
				.senha(new BCryptPasswordEncoder().encode("Impacta123"))
				.dataCadastro(LocalDateTime.now())
				.primeiroNome("Wilson").ultimoNome("de Almeida")
				.endereco(Endereco.builder()
						.cep("05892335")
						.cidade("São Paulo")
						.estado("SP")
						.numero("1001")
						.endereco("Travessa Maria Isabel Novais Braga")
						.build()).build();

		usuarioRepository.save(wilson);
		marcaRepository.saveAll(Arrays.asList(toyota, honda, ford, chevrolet, volkswagen, bmw, mercedes, audi, nissan, hyundai));


	}
}
