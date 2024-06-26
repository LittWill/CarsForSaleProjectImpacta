import { Component, Input, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AsyncPipe, NgFor } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { startWith, map, Observable } from 'rxjs';
import { MarcaService } from '../services/marca.service';
import { MarcaResponse } from '../interfaces/marca-response';
import { AnuncioRequest } from '../interfaces/anuncio-request';
import { AnuncioServiceService } from '../services/anuncio-service.service';
import { AlertService } from "../services/alert.service";
import { ActivatedRoute, Router } from "@angular/router";
import { AnuncioResponse } from '../interfaces/anuncio-response';

@Component({
  selector: 'app-anunciar-veiculo',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatSelectModule, MatAutocompleteModule, AsyncPipe, ReactiveFormsModule, NgFor],
  templateUrl: './anunciar-veiculo.component.html',
  styleUrl: './anunciar-veiculo.component.scss'
})
export class AnunciarVeiculoComponent {
  marcas: MarcaResponse[] = [];
  formularioAnuncio!: FormGroup
  options: MarcaResponse[] = [];
  anuncioRequest !: AnuncioRequest

  anuncioId!: string;
  anuncio!: AnuncioResponse

  fotos: any[] = [];

  constructor(private marcaService: MarcaService,
    private formBuilder: FormBuilder,
    private anuncioService: AnuncioServiceService,
    private alertService: AlertService,
    private router: Router, private route: ActivatedRoute) {


    this.formularioAnuncio = this.formBuilder.group({
      marca: ['', [Validators.required]],
      modelo: ['', [Validators.required]],
      quilometragem: ['', [Validators.required]],
      ano: ['', [Validators.required]],
      combustivel: ['', [Validators.required]],
      cor: ['', [Validators.required]],
      valor: ['', [Validators.required]],
      tipoNegociacao: ['', [Validators.required]]
    })

    this.anuncioId = this.route.snapshot.params['id'];

    if (this.anuncioId) {
      this.buscarAnuncioEConstruirFormularioEdicao();
    }

    marcaService.obterMarcas().subscribe({
      next: (marcas: MarcaResponse[]) => {
        this.marcas = marcas
      },
      error: (error) => {
        this.alertService.alert("Houve um erro!", "Não foi possível estabelecer comunicação com o servidor", "error")
      }
    })

    marcaService.obterMarcas().subscribe((marcaResponse: MarcaResponse[]) => {
      this.marcas = marcaResponse;
      this.options = this.marcas;
    });
  }

  private construirFormularioEdicao() {
    let marca = this.anuncio.veiculo.marca.id;
    let modelo = this.anuncio.veiculo.modelo;
    let quilometragem = this.anuncio.veiculo.kmRodados;
    let ano = this.anuncio.veiculo.ano;
    let combustivel = this.anuncio.veiculo.tipoCombustivel;
    let cor = this.anuncio.veiculo.cor;
    let valor = this.anuncio.valor;
    let tipoNegociacao = this.anuncio.tipoNegociacao;

    this.formularioAnuncio = this.formBuilder.group({
      marca: [marca, [Validators.required]],
      modelo: [modelo, [Validators.required]],
      quilometragem: [quilometragem, [Validators.required]],
      ano: [ano, [Validators.required]],
      combustivel: [combustivel, [Validators.required]],
      cor: [cor, [Validators.required]],
      valor: [valor, [Validators.required]],
      tipoNegociacao: [tipoNegociacao, [Validators.required]]
    });
  }

  private buscarAnuncioEConstruirFormularioEdicao() {
    this.anuncioService.obterAnuncio(this.anuncioId).subscribe({
      next: (anuncio: AnuncioResponse) => {
        this.anuncio = anuncio;
        this.fotos.push(...anuncio.fotos)
        this.construirFormularioEdicao()

      },
      error: () => {
        this.alertService.alert("Houve um erro!", "Não foi possível estabelecer comunicação com o servidor!", 'error');
      }
    });
  }

  removerImagem(event: any) {
    this.fotos.splice(this.fotos.indexOf(event.target.parentElement.parentElement.children[0].src), 1)
  }

  incluirImagensV2(event: any) {
    this.encodeImages(event);
  }

  criarUrlParaImagem(imagem: File) {
    return URL.createObjectURL(imagem);
  }

  encodeImages(event: any) {
    this.encodeImagemFileAsUrl(event.target.files).then((result) => {
      this.fotos.push(...result)
    });
  }

  async encodeImagemFileAsUrl(fileList: FileList): Promise<(string | ArrayBuffer | null)[]> {
    const encodedImages: (string | ArrayBuffer | null)[] = [];
    for (let i = 0; i < fileList.length; i++) {
      const fileReader = new FileReader();
      const file = fileList.item(i);
      if (file) {
        const result = await new Promise<string | ArrayBuffer | null>((resolve, reject) => {
          fileReader.onload = (event) => {
            resolve(event.target?.result!);
          };
          fileReader.onerror = (error) => {
            reject(error);
          };
          fileReader.readAsDataURL(file);
        });
        encodedImages.push(result);
      }
    }

    return encodedImages;
  }


  submeter() {

    this.anuncioRequest = {
      descricao: "teste",
      tipoNegociacao: this.formularioAnuncio.value.tipoNegociacao,
      valor: this.formularioAnuncio.value.valor,
      fotos: this.fotos,
      veiculo: {
        marca: this.formularioAnuncio.value.marca,
        modelo: this.formularioAnuncio.value.modelo,
        kmRodados: this.formularioAnuncio.value.quilometragem,
        ano: this.formularioAnuncio.value.ano,
        tipoCombustivel: this.formularioAnuncio.value.combustivel,
        cor: this.formularioAnuncio.value.cor
      }
    }

    if (this.anuncio) {
      this.anuncioService.atualizarAnuncio(this.anuncioId, this.anuncioRequest).subscribe({
        next: (response: any) => {
          this.alertService.alert("Seu anúncio foi atualizado!", "Você será redirecionado para sua página de anúncios.", "success").then(response => {
            if (response.isConfirmed) {
              this.router.navigate(['/anuncios/meus']);
            }
          })
        },
        error: () => {
          this.alertService.alert("Houve um erro!", "Não foi possível estabelecer conexão com o servidor!", "error").then(response => {
            console.log(response.isConfirmed);
          })
        }
      });
    }
    else {
      this.anuncioService.salvarAnuncio(this.anuncioRequest).subscribe({
        next: (response: any) => {
          this.alertService.alert("Seu anúncio foi publicado!", "Você será redirecionado para sua página de anúncios.", "success").then(response => {
            if (response.isConfirmed) {
              this.router.navigate(['/anuncios/meus']);
            }
          })
        },
        error: () => {
          this.alertService.alert("Houve um erro!", "Não foi possível estabelecer conexão com o servidor!", "error").then(response => {
            console.log(response.isConfirmed);
          })
        }
      });
    }

    console.log(this.anuncioRequest);


  }

}
