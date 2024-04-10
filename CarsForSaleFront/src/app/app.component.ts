import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import {LoginComponent} from "./login/login.component";
import { SpinnerComponent } from './spinner/spinner.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
  imports: [RouterOutlet, NavbarComponent, LoginComponent, SpinnerComponent]
})
export class AppComponent {
  title = 'teste-sem-rota';
}
