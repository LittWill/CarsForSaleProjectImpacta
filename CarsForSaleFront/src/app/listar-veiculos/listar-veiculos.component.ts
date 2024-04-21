import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { AnuncioServiceService } from '../services/anuncio-service.service';
import { CardVeiculoComponent } from "../card-veiculo/card-veiculo.component";
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { AlertService } from "../services/alert.service";
import { MarcaResponse } from "../interfaces/marca-response";
import { SpinnerService } from '../services/spinner.service';
import { AnuncioResponse } from '../interfaces/anuncio-response';

@Component({
  selector: 'app-listar-veiculos',
  standalone: true,
  templateUrl: './listar-veiculos.component.html',
  styleUrl: './listar-veiculos.component.scss',
  imports: [CardVeiculoComponent, NgFor, NgIf]
})
export class ListarVeiculosComponent implements OnInit{

  @Input()
  meusAnuncios = false;
  @Input()
  anuncios = []

  constructor(private anuncioService: AnuncioServiceService,
    private alertService: AlertService,
    public spinnerService: SpinnerService) {
  }
  ngOnInit(): void {
    if (!this.meusAnuncios) {
      this.anuncioService.obterAnuncios().subscribe({
        next: (anuncios: any) => {
          this.anuncios = anuncios
        },
        error: (erro: any) => {
          this.alertService.alert("Houve um erro!", "Não foi possível estabelecer comunuicação com o servidor", "error")
        }
      })
    }
  }
}
