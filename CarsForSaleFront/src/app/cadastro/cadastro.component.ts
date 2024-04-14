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
import { UsuarioForm } from '../interfaces/usuario-form';

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
  usuarioForm !: UsuarioForm
  hidePassword = true;
  hideConfirmPassword = true;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService, private alertService: AlertService, private router: Router) {

    this.formularioCadastro = this.formBuilder.group({
      primeiroNome: ['Wilson', [Validators.required]],
      ultimoNome: ['Almeida', [Validators.required]],
      email: ['wilson@email.com', [Validators.required, Validators.email]],
      senha: ['WilsonHawx123!', [Validators.required, Validators.minLength(8), this.senhaPossuiUmNumeroValidator()]],
      confirmacaoSenha: ['WilsonHawx123!', [Validators.required, Validators.minLength(8)]],
      cidade: ['Poá', [Validators.required]],
      estado: ['SP', [Validators.required]],
      endereco: ['Rua Guariba', [Validators.required]],
      numero: ['110', [Validators.required]]

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
    this.usuarioForm = {
      email: this.formularioCadastro.value.email,
      senha: this.formularioCadastro.value.senha,
      primeiroNome: this.formularioCadastro.value.primeiroNome,
      ultimoNome: this.formularioCadastro.value.ultimoNome,
      endereco: {
        cidade: this.formularioCadastro.value.cidade,
        estado: this.formularioCadastro.value.estado,
        endereco: this.formularioCadastro.value.cidade,
        numero: this.formularioCadastro.value.cidade
      }
    }

    this.authService.cadastrarUsuario(this.usuarioForm).subscribe({
      next : (response) => {
        this.alertService.alert('Legal! Você está cadastrado!', 'Em seguida, você será redirecionado para à página de login!', 'success')
        .then(isConfirmed => {
          if (isConfirmed){
            this.router.navigate(['/login'])
          }
        })
      },
      error: (err) => {
        this.alertService.alert('Não foi possível concluir o seu cadastro!', 'Tente novamente mais tarde!', 'error');
      }
    });
  }

}
