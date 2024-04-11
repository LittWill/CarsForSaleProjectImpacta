import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthRequest} from "../interfaces/auth-request";
import {BackendEndpoints} from "../constants/backend-endpoints";
import {Observable} from "rxjs";
import {UserDetailsResponse} from "../interfaces/user-details-response";
import {AlertService} from "./alert.service";
import {Router} from "@angular/router";
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, private alertService: AlertService, private router: Router) {
  }

  autenticar(authRequest: AuthRequest) {
    const encodedCredentials = btoa(`${authRequest.email}:${authRequest.senha}`);
    const httpHeaders = new HttpHeaders()
      .append("Authorization", "Basic " + encodedCredentials);
    return this.httpClient.post(BackendEndpoints.HOST + "/authenticate", null, {
      headers: httpHeaders,
      responseType: 'text'
    }).subscribe({
      next: token => {
        this.armazenarToken(token)
        this.buscarInformacoesDoUsuario().subscribe({
          next: (response: UserDetailsResponse) => {
            this.armazenarUsuario(response)
            this.router.navigate(['/']);
          },
          error: (error) => {
            this.alertService.alert("Houve um erro!", "Não foi possível estabelecer comunuicação com o servidor", "error")
          }
        });
      },
      error: error => {
        this.alertService.alert("Houve um erro!", "Não foi possível estabelecer conexão com o servidor!", "error").then(response => {
          console.log(response.isConfirmed);
        })
      }
    });
  }

  armazenarToken(token: string) {
    localStorage.setItem("token", token);
  }

  obterToken() {
    return localStorage.getItem("token");
  }
  armazenarUsuario(userDetails: UserDetailsResponse){
    localStorage.setItem("userDetails", JSON.stringify(userDetails));
  }

  logout() {
    localStorage.removeItem("token")
    localStorage.removeItem("userDetails")
  }

  buscarInformacoesDoUsuario(){
    return this.httpClient.get<UserDetailsResponse>(BackendEndpoints.HOST + "/usuarios/me");
  }

  usuarioEstaAutenticado(){
    const token = this.obterToken()

    console.log(token)

    if (!token){
        return false;
    }

    const decodedToken = jwtDecode(token);

    const dataExpiracao = new Date(0)
    dataExpiracao.setUTCSeconds(decodedToken.exp!)

    return dataExpiracao > new Date();
  }
}
