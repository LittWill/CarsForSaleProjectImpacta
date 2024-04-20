import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthRequest } from '../interfaces/auth-request';
import { AuthService } from '../services/login.service';
import { SpinnerService } from '../services/spinner.service';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatLabel, MatPrefix } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { AlertService } from '../services/alert.service';
import { ChangePasswordForm } from '../interfaces/change-pass-form';

@Component({
  selector: 'app-esqueceu-senha',
  standalone: true,
  imports: [MatFormField,
    MatInput,
    MatLabel,
    MatPrefix,
    ReactiveFormsModule,
    MatButtonModule, MatIconModule, RouterLink, NgIf],
  templateUrl: './esqueceu-senha.component.html',
  styleUrl: './esqueceu-senha.component.css'
})
export class EsqueceuSenhaComponent {
  formularioLogin: FormGroup
  hidePassword = true;
  hideConfirmPassword = true;

  states = [
    {
      actionName: "submitEmail",
      actionFunc: () => {
        this.authService.gerarTokenRecuperacaoSenha(this.formularioLogin.value.email).subscribe({
          next: () => {
            this.nextState();
          },
          error: () => {
            this.alertService.alert('Não foi possível gerar o token de recuperação de senha!', 'Tente novamente mais tarde!', 'error')
          }
        });
      }
    },
    {
      actionName: "validateCodigo",
      actionFunc: () => {
        this.authService.validarCodigo(this.formularioLogin.value.codigo).subscribe({
          next: () => {
            this.nextState();
          },
          error: () => {
            this.alertService.alert('Não foi possível validar o token!', 'Tente novamente mais tarde!', 'error')
          }
        })
      }
    },
    {
      actionName: "submitPassword",
      actionFunc: () => {
        const changePasswordForm: ChangePasswordForm = {
          email: this.formularioLogin.value.email,
          codigoRecuperacao: this.formularioLogin.value.codigo,
          senhaNova: this.formularioLogin.value.senha
        }
        this.authService.alterarSenha(changePasswordForm).subscribe({
          next: () => {
              this.alertService.alert('Sua senha foi alterada com sucesso!', 'Você será redirecionado para a página de login!', 'success')
              .then(isConfirmed => {
                if (isConfirmed) {
                  this.router.navigate(['/login'])
                }
              })
          },
          error: () => {
            this.alertService.alert('Não foi alterar sua senha!', 'Tente novamente mais tarde!', 'error')
          }
        })
      }
    }
  ]
  currentState

  constructor(private formBuilder: FormBuilder,

    private authService: AuthService, public spinnerService: SpinnerService, private alertService: AlertService, private router: Router) {
    this.formularioLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      codigo: ['', [Validators.required, Validators.maxLength(6), Validators.minLength(6)]],
      senha: ['', [Validators.required, Validators.minLength(8), this.senhaPossuiUmNumeroValidator()]],
      confirmacaoSenha: ['', [Validators.required, Validators.minLength(8)]]
    }, {validators: this.senhasCoincidemValidator()});

    this.currentState = this.states[0]
  }

  whichIndexState(actionName: string) {
    return this.states.findIndex(states => states.actionName === actionName)
  }

  nextState() {
    this.currentState = this.states[this.whichIndexState(this.currentState.actionName) + 1];
  }

  submeter() {
    this.currentState.actionFunc();
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
}
