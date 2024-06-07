import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { AnuncioServiceService } from '../services/anuncio-service.service';
import { CardVeiculoComponent } from "../card-veiculo/card-veiculo.component";
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { AlertService } from "../services/alert.service";
import { MarcaResponse } from "../interfaces/marca-response";
import { SpinnerService } from '../services/spinner.service';
import { AnuncioResponse } from '../interfaces/anuncio-response';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { SearchService } from '../search.service';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-listar-veiculos',
  standalone: true,
  templateUrl: './listar-veiculos.component.html',
  styleUrl: './listar-veiculos.component.scss',
  imports: [CardVeiculoComponent, NgFor, NgIf, NavbarComponent, MatFormFieldModule, MatInputModule, MatIconModule, MatSelectModule, MatFormField, ReactiveFormsModule]
})
export class ListarVeiculosComponent implements OnInit {

  formularioFiltragem!: FormGroup;

  @Input()
  meusAnuncios = false;
  @Input()
  anuncios: AnuncioResponse[] = []

  filtrosAplicados = false;

  constructor(private anuncioService: AnuncioServiceService,
    private alertService: AlertService,
    public spinnerService: SpinnerService,
    private searchService: SearchService,
    private formBuilder: FormBuilder) {
  }
  ngOnInit(): void {
    this.formularioFiltragem = this.formBuilder.group({
      valorMinimo: [0],
      valorMaximo: [0],
      quilometragemMinima: [0],
      quilometragemMaxima: [0],
      anoMinimo: [''],
      anoMaximo: [''],
      cor: [''],
      combustivel: [''],
      tipoNegociacao: [''],
    });
    this.searchService.getSearchText().subscribe(searchText => {
      if (searchText) {
        this.anuncioService.obterAnunciosBuscaSimples(searchText).subscribe({
          next: (anuncios: AnuncioResponse[]) => {
            this.anuncios = anuncios
            this.filtrosAplicados = true;
            this.searchService.setSearchText('');
          }
        })
      }

    })

    if (!this.meusAnuncios) {
      this.buscarTodosAnuncios();
    }
  }

  removerFiltros() {
    this.buscarTodosAnuncios()
    this.filtrosAplicados = false;
  }

  buscarTodosAnuncios() {
    this.anuncioService.obterAnuncios().subscribe({
      next: (anuncios: any) => {
        this.anuncios = anuncios
      },
      error: (erro: any) => {
        this.alertService.alert("Houve um erro!", "Não foi possível estabelecer comunicação com o servidor", "error")
      }
    })
  }


}
