import { Component } from '@angular/core';
import { ListarVeiculosComponent } from "../listar-veiculos/listar-veiculos.component";
import { AlertService } from '../services/alert.service';
import { AnuncioServiceService } from '../services/anuncio-service.service';
import { SpinnerService } from '../services/spinner.service';

@Component({
    selector: 'app-meus-anuncios',
    standalone: true,
    templateUrl: './meus-anuncios.component.html',
    styleUrl: './meus-anuncios.component.css',
    imports: [ListarVeiculosComponent]
})
export class MeusAnunciosComponent {

  anuncios = [];

  constructor(private anuncioService: AnuncioServiceService,
    private alertService: AlertService,
    public spinnerService: SpinnerService) {
      anuncioService.obterMeusAnuncios().subscribe({
        next: (anuncios : any) => {
          this.anuncios = anuncios;
        },
        error: (erro: any) => {
          this.alertService.alert("Houve um erro!", "Não foi possível estabelecer comunuicação com o servidor", "error")
        }
      })
  }

}
