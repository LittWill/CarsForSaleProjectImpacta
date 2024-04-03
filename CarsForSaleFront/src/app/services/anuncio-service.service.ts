import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AnuncioRequest } from '../interfaces/anuncio-request';
import {BackendEndpoints} from "../constants/backend-endpoints";

@Injectable({
  providedIn: 'root'
})
export class AnuncioServiceService {

  constructor(private httpClient: HttpClient) {
  }

  obterAnuncios() {
    return this.httpClient.get(BackendEndpoints.HOST + "/anuncios");
  }

  salvarAnuncio(formularioAnuncio: AnuncioRequest) {
    return this.httpClient.post(BackendEndpoints.HOST + "/anuncios", formularioAnuncio);
  }
}
