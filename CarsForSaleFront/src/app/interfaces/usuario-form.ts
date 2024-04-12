export interface UsuarioForm {
    primeiroNome: string;
    ultimoNome: string;
    email: string;
    senha: string;
    endereco: EnderecoForm
}

export interface EnderecoForm {
    estado: string;
    cidade: string;
    endereco: string;
    numero: string;
}
