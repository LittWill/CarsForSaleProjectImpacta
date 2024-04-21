import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AnuncioRequest } from '../interfaces/anuncio-request';
import {BackendEndpoints} from "../constants/backend-endpoints";
import { AnuncioResponse } from '../interfaces/anuncio-response';

@Injectable({
  providedIn: 'root'
})
export class AnuncioServiceService {

  constructor(private httpClient: HttpClient) {
  }

  obterAnuncios() {
    return this.httpClient.get(BackendEndpoints.HOST + "/anuncios");
  }

  obterMeusAnuncios() {
    return this.httpClient.get<AnuncioResponse>(BackendEndpoints.HOST + "/anuncios/me");
  }

  salvarAnuncio(formularioAnuncio: AnuncioRequest) {
    return this.httpClient.post(BackendEndpoints.HOST + "/anuncios", formularioAnuncio);
  }

  alternarAtivacaoAnuncio(id: string) {
    return this.httpClient.patch<AnuncioResponse>(BackendEndpoints.HOST + "/anuncios/toggleActive/" + id, null);
  }
}
