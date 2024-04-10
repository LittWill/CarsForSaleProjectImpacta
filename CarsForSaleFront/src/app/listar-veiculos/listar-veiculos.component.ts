import { Component } from '@angular/core';
import { AnuncioServiceService } from '../services/anuncio-service.service';
import { CardVeiculoComponent } from "../card-veiculo/card-veiculo.component";
import { NgFor, NgIf } from '@angular/common';
import {AlertService} from "../services/alert.service";
import {MarcaResponse} from "../interfaces/marca-response";

@Component({
    selector: 'app-listar-veiculos',
    standalone: true,
    templateUrl: './listar-veiculos.component.html',
    styleUrl: './listar-veiculos.component.scss',
    imports: [CardVeiculoComponent, NgFor, NgIf]
})
export class ListarVeiculosComponent {

  anuncios = []

  constructor(private anuncioService: AnuncioServiceService,
              private alertService: AlertService){

    anuncioService.obterAnuncios().subscribe({
      next: (anuncios: any) => {
        this.anuncios = anuncios
      },
      error: (erro: any) => {
        this.alertService.alert("Houve um erro!", "Não foi possível estabelecer comunuicação com o servidor", "error")
      }
    })
  }


}
