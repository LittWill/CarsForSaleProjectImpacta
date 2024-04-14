import { Component } from '@angular/core';
import { MarcaResponse } from "../interfaces/marca-response";
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { AnuncioRequest } from "../interfaces/anuncio-request";
import { map, Observable, startWith } from "rxjs";
import { AnuncioServiceService } from "../services/anuncio-service.service";
import { AlertService } from "../services/alert.service";
import { Router, RouterLink } from "@angular/router";
import { MatFormField, MatFormFieldModule, MatLabel } from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import { MatIconButton } from "@angular/material/button";
import { MatInput } from "@angular/material/input";
import { AuthRequest } from "../interfaces/auth-request";
import { AuthService } from "../services/login.service";

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [
    MatFormFieldModule,
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
  hidePassword = true;
  hideConfirmPassword = true;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService) {

    this.formularioCadastro = this.formBuilder.group({
      primeiroNome: ['', [Validators.required]],
      ultimoNome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(8), this.senhaPossuiUmNumeroValidator()]],
      confirmacaoSenha: ['', [Validators.required, Validators.minLength(8)]],
      cidade: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      endereco: ['', [Validators.required]],
      numero: ['', [Validators.required]]

    }, {validators: this.senhasCoincidemValidator()});
  }

  senhaPossuiUmNumeroValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      return value && this.senhaPossuiUmNumero(value) ? null : { senhaSemNumero: true };
    };
  }

  senhasCoincidemValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const senha = control.get('senha')?.value;
      const confirmacaoSenha = control.get('confirmacaoSenha')?.value;
      return senha === confirmacaoSenha ? null : { senhasNaoCoincidem: true };
    };
  }

  senhaPossuiUmCaractereEspecialValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      return value && this.senhaPossuiUmCaractereEspecial(value) ? null : { senhaSemCaractereEspecial: true };
    };
  }
  

  senhaPossuiTamanhoMinimo(value: string) {
    return value.length >= 8;
  }

  senhaPossuiUmNumero(value: string) {
    return value.match('[0-9]') != null;
  }

  senhaPossuiUmCaractereEspecial(value: string) {
    return value.match('[!@#$%^&*()_+{}\:;<>,.?\/\\|~-]') != null;
  }

  senhasCoincidem(senha: string, confirmacaoSenha: string) {
    return senha.length > 0 && confirmacaoSenha.length > 0 && senha === confirmacaoSenha
  }

  submeter() {
    this.authRequest = {
      email: this.formularioCadastro.value.email,
      senha: this.formularioCadastro.value.senha
    }

    this.authService.autenticar(this.authRequest);
  }

}
