import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../services/login.service';
import { MatIconModule } from '@angular/material/icon';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgIf, MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  constructor(public authService : AuthService, private router: Router, private alertService: AlertService){
    
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

}
