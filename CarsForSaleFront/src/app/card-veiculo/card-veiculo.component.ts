import { AfterViewInit, Component, Input } from '@angular/core';
import { AnuncioServiceService } from '../services/anuncio-service.service';
import { CommonModule } from '@angular/common';
import { AlertService } from '../services/alert.service';
import { AnuncioResponse } from '../interfaces/anuncio-response';

@Component({
  selector: 'app-card-veiculo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-veiculo.component.html',
  styleUrl: './card-veiculo.component.scss'
})
export class CardVeiculoComponent {

  @Input()
  anuncio !: AnuncioResponse

  @Input()
  mostrarBotoesDeAcao: boolean = false;

  constructor(private anuncioService: AnuncioServiceService, private alertService: AlertService) {

  }

  alternarAtivacaoAnuncio(anuncio: AnuncioResponse) {
    let titulo = "Tem certeza que deseja ativar seu anúncio?"
    let mensagem = "Seu anúncio voltará a ser listado para outras pessoas."
    let mensagemSucesso = "Seu anúncio foi ativado com sucesso!"
    if (anuncio.ativo) {
      titulo = "Tem certeza que deseja desativar seu anúncio?"
      mensagem = "Seu anúncio deixará de ser listado para outras pessoas até que você o ative novamente."
      mensagemSucesso = "Seu anúncio foi desativado com sucesso!"
    }

    this.alertService.alert(titulo, mensagem, 'warning', true).then(isConfirmed => {
      if (isConfirmed){
        this.anuncioService.alternarAtivacaoAnuncio(anuncio.id).subscribe({
          next: (anuncioAtualizado: AnuncioResponse) => {
            anuncio.ativo = anuncioAtualizado.ativo;
            this.alertService.alert('Deu certo!', mensagemSucesso, 'success');
          },
          error: () => {
            this.alertService.alert('Algo deu errado!', "Não foi possível estabelecer comunicação com o servidor!", 'error');
          }
        })
      }
    })
  }





}
