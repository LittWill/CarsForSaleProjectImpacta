import { NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../services/login.service';
import { MatIconModule } from '@angular/material/icon';
import { AlertService } from '../services/alert.service';
import {MatMenuModule} from '@angular/material/menu'
import { FormsModule } from '@angular/forms';
import { AnuncioServiceService } from '../services/anuncio-service.service';
import { AnuncioResponse } from '../interfaces/anuncio-response';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgIf, MatIconModule, MatMenuModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  busca: string = '';

  constructor(public authService : AuthService, private router: Router, private alertService: AlertService, private searchService : SearchService){
    
  }

  logout(){
    this.alertService.alert('Tem certeza que deseja encerrar sua sessão?', 'Você será redirecionado para a página de login.', 'warning', true)
    .then(result => {
      if (result.isConfirmed){
        this.router.navigate(['/login'])
        this.authService.logout();
      }
    });
  }

  buscar(){
    this.searchService.setSearchText(this.busca);
    this.busca = '';
  }

}
