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

    save(dadosUsuario: Usuario, datacadastro: any){
        const usuario = {
            nome: dadosUsuario.nome,
            email: dadosUsuario.email,
            senha: dadosUsuario.senha,
            datanascimento: dadosUsuario.datanascimento,
            altura: dadosUsuario.altura,
            sexo: dadosUsuario.sexo,
            datacadastro: datacadastro,
        }
        return this.http.post('http://localhost:3000/usuarios', JSON.stringify(usuario), this.options)
            .map(response => response.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Erro ao conectar ao servidor.'));
    }

    delete(idUsuario: number) {
        return this.http.delete('http://localhost:3000/usuarios/' + idUsuario)
            .map(response => response.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Erro ao conectar ao servidor.'));
    }
    
    getUsuariosByEmail(email: string){
        return this.http.get('http://localhost:3000/usuarios?email='+email)
        .map(response => response.json());
    }

    update(dadosUsuario: any, idUser: any, datacadastro: any) {
        const usuario = {
            id: idUser,
            nome: dadosUsuario.nome,
            email: dadosUsuario.email,
            senha: dadosUsuario.senha,
            datanascimento: dadosUsuario.datanascimento,
            altura: dadosUsuario.altura,
            sexo: dadosUsuario.sexo,
            datacadastro: datacadastro,
        }
        return this.http.put('http://localhost:3000/usuarios/' + usuario.id, JSON.stringify(usuario), this.options)
            .map(response => response.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Erro ao conectar ao servidor.'));
    }
}