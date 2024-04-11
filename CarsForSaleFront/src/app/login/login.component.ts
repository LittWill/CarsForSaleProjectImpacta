import { Component } from '@angular/core';
import { MatFormField, MatLabel, MatPrefix } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatOption } from "@angular/material/autocomplete";
import { MatSelect } from "@angular/material/select";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MarcaResponse } from "../interfaces/marca-response";
import { AnuncioRequest } from "../interfaces/anuncio-request";
import { map, Observable, startWith } from "rxjs";
import { MarcaService } from "../services/marca.service";
import { AnuncioServiceService } from "../services/anuncio-service.service";
import { AlertService } from "../services/alert.service";
import { Router, RouterLink } from "@angular/router";
import { AuthRequest } from "../interfaces/auth-request";
import { AuthService } from "../services/login.service";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { NgIf } from '@angular/common';
import { SpinnerService } from '../services/spinner.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    MatPrefix,
    ReactiveFormsModule,
    MatButtonModule, MatIconModule, RouterLink, NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  formularioLogin: FormGroup
  authRequest !: AuthRequest
  hide = true;
  constructor(private formBuilder: FormBuilder,
    private authService: AuthService, private router: Router, public spinnerService : SpinnerService) {

      if (authService.usuarioEstaAutenticado()){
        router.navigate(['/anuncios'])
      }

    this.formularioLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]]
    });
  }

  submeter() {
    this.authRequest = {
      email: this.formularioLogin.value.email,
      senha: this.formularioLogin.value.senha
    }

    console.log(this.authRequest);

    this.authService.autenticar(this.authRequest);
  }

}
