export interface AnuncioRequest {
    veiculo: VeiculoRequest
    valor: number
    descricao: string,
    tipoNegociacao: string,
    fotos: string[]
    
}

export interface VeiculoRequest {
    marca: string,
    modelo: string,
    kmRodados: string,
    ano: string,
    tipoCombustivel: string,
    cor: string

}