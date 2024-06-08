import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AnuncioRequest } from '../interfaces/anuncio-request';
import { BackendEndpoints } from "../constants/backend-endpoints";
import { AnuncioResponse } from '../interfaces/anuncio-response';

@Injectable({
  providedIn: 'root'
})
export class AnuncioServiceService {

  constructor(private httpClient: HttpClient) {
  }

  obterAnuncio(id: string) {
    return this.httpClient.get<AnuncioResponse>(BackendEndpoints.HOST + "/anuncios/" + id);
  }


  obterAnuncios() {
    return this.httpClient.get(BackendEndpoints.HOST + "/anuncios");
  }

  obterAnunciosBuscaSimples(busca: string) {
    return this.httpClient.get<AnuncioResponse[]>(BackendEndpoints.HOST + "/anuncios/filtrar" + `?marca=${busca}&modelo=${busca}`);
  }

  obterMeusAnuncios() {
    return this.httpClient.get<AnuncioResponse>(BackendEndpoints.HOST + "/anuncios/me");
  }

  salvarAnuncio(formularioAnuncio: AnuncioRequest) {
    return this.httpClient.post(BackendEndpoints.HOST + "/anuncios", formularioAnuncio);
  }

  atualizarAnuncio(id: string, formularioAnuncio: AnuncioRequest) {
    return this.httpClient.put(BackendEndpoints.HOST + "/anuncios/" + id, formularioAnuncio);
  }

  alternarAtivacaoAnuncio(id: string) {
    return this.httpClient.patch<AnuncioResponse>(BackendEndpoints.HOST + "/anuncios/toggleActive/" + id, null);
  }

  obterAnunciosFiltro(busca: string, valorMinimo?: number, valorMaximo?: number, tipoNegociacao?: string, quilometragemMinima?: number, quilometragemMaxima?: number, tipoCombustivel?: string, cor?: string, anoMinimo?: string, anoMaximo?: string) {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('modelo', busca)
    httpParams = httpParams.append('marca', busca)
    if (valorMinimo) {
      httpParams = httpParams.append('valorMin', valorMinimo);
    }
    if (valorMaximo) {
      httpParams = httpParams.append('valorMax', valorMaximo);
    }
    if (tipoNegociacao) {
      httpParams = httpParams.append('tipoNegociacao', tipoNegociacao);
    }
    if (quilometragemMinima) {
      httpParams = httpParams.append('kmMin', quilometragemMinima);
    }
    if (quilometragemMaxima) {
      httpParams = httpParams.append('kmMax', quilometragemMaxima);
    }
    if (tipoCombustivel) {
      httpParams = httpParams.append('tipoCombustivel', tipoCombustivel);
    }
    if (cor) {
      httpParams = httpParams.append('cor', cor);
    }
    if (anoMinimo) {
      httpParams = httpParams.append('anoMin', anoMinimo);
    }
    if (anoMaximo) {
      httpParams = httpParams.append('anoMax', anoMaximo);
    }
    return this.httpClient.get<AnuncioResponse[]>(BackendEndpoints.HOST + `/anuncios/filtrar`, {
      params: httpParams
    });
  }
}
