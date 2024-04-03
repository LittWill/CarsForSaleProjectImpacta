import { AfterViewInit, Component, Input } from '@angular/core';
import { AnuncioServiceService } from '../services/anuncio-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-veiculo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-veiculo.component.html',
  styleUrl: './card-veiculo.component.scss'
})
export class CardVeiculoComponent implements AfterViewInit{

  @Input()
  anuncio : any

  constructor(private anuncioService: AnuncioServiceService){
  
  }
  ngAfterViewInit(): void {
   console.log(this.anuncio)
  }

  

}
