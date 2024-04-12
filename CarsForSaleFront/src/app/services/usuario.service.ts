import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BackendEndpoints } from '../constants/backend-endpoints';
import { UsuarioForm } from '../interfaces/usuario-form';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private httpClient: HttpClient) { }

  cadastrarUsuario(usuarioForm: UsuarioForm) : Observable<any> {
    return this.httpClient.post(BackendEndpoints.HOST + "/usuarios", usuarioForm);
  }
}
