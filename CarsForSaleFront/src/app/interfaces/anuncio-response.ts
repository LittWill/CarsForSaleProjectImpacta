export interface AnuncioResponse {
    id: string;
    veiculo: VeiculoResponse;
    valor: number;
    anunciante: UsuarioResponse;
    fotos: string[];
    descricao: string;
    dataPublicacao: string;
    tipoNegociacao: string;
    ativo: boolean;
}

interface VeiculoResponse {
    modelo: string;
    marca: MarcaResponse;
    kmRodados: number;
    ano: string;
    tipoCombustivel: string;
    cor: string;
}

interface MarcaResponse {
    id: string;
    nome: string;
    dataCriacao: string; // você pode querer usar um tipo mais específico para datas em TypeScript
    foto: string;
}

interface UsuarioResponse {
    dataCadastro: string; // você pode querer usar um tipo mais específico para datas em TypeScript
    primeiroNome: string;
    ultimoNome: string;
    email: string;
    endereco: EnderecoResponse;
}

interface EnderecoResponse {
    cep: string;
    estado: string;
    cidade: string;
    endereco: string;
}