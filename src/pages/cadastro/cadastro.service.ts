import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Usuario } from './Usuario';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';

@Injectable()
export class UsuarioService {
    private headers = null;
    private options = null;

    constructor(private http: Http) { 
        this.headers = new Headers({'Content-Type': 'application/json'});
        this.options = new RequestOptions({ headers: this.headers });
    }

    save(dadosUsuario: Usuario){
        const usuario = {
            nome: dadosUsuario.nome,
            email: dadosUsuario.email,
            senha: dadosUsuario.senha,
            datanascimento: dadosUsuario.datanascimento,
            altura: dadosUsuario.altura,
            sexo: dadosUsuario.sexo,
            datacadastro: dadosUsuario.datacadastro,
        }
        console.log(usuario);
        return this.http.post('http://localhost:3000/usuarios', JSON.stringify(usuario), this.options)
            .map(response => response.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Erro ao conectar ao servidor.'));
    }
}