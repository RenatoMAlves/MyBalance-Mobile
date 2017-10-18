export class Usuario {

    nome: string;
    email: string;
    datanascimento: string;
    cpf: string;
    senha: string;
    altura: number;
    sexo: string;
    datacadastro: string;
    status: string;

    constructor(nome: string,
        email: string,
        datanascimento: string,
        cpf: string,
        senha: string,
        altura: number,
        sexo: string,
        datacadastro: string,
        status: string) {
        

            this.nome = nome;
            this.email = email;
            this.datanascimento = datanascimento,
            this.cpf = cpf;
            this.senha = senha;
            this.altura = altura;
            this.sexo = sexo;        
            this.datacadastro = datacadastro;
            this.status = status;
    }
}