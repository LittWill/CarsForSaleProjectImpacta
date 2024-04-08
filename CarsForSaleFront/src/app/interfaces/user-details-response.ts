export interface UserDetailsResponse {
    primeiroNome: string;
    ultimoNome: string;
    email: string;
    endereco: EnderecoUserDetailsResponse
}

export interface EnderecoUserDetailsResponse {
    estado: string;
    cidade: string;
}
