import { Component } from '@angular/core';
import {MarcaResponse} from "../interfaces/marca-response";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AnuncioRequest} from "../interfaces/anuncio-request";
import {map, Observable, startWith} from "rxjs";
import {AnuncioServiceService} from "../services/anuncio-service.service";
import {AlertService} from "../services/alert.service";
import {Router, RouterLink} from "@angular/router";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {AuthRequest} from "../interfaces/auth-request";
import {AuthService} from "../services/login.service";

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [
    FormsModule,
    MatFormField,
    MatIcon,
    MatIconButton,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {

  formularioCadastro: FormGroup
  authRequest !: AuthRequest
  hide = true;
  constructor(private formBuilder: FormBuilder,
              private authService: AuthService) {

    this.formularioCadastro = this.formBuilder.group({
      primeiroNome: ['', [Validators.required]],
      ultimoNome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]],
      cep: ['', [Validators.required]],
      cidade: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      endereco: ['', [Validators.required]],
      numero: ['', [Validators.required]]

    });
  }

  submeter() {
    this.authRequest = {
      email: this.formularioCadastro.value.email,
      senha: this.formularioCadastro.value.senha
    }

    console.log(this.authRequest);

    this.authService.autenticar(this.authRequest);
  }

}
