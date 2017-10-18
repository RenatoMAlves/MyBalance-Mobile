import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Usuario } from "./Usuario";
import { TabsPage } from '../tabs/tabs';
import { AlertController } from 'ionic-angular';
import { UsuarioService } from './cadastro.service';

/**
 * Generated class for the CadastroPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {
  novo_usuario: any = new Usuario("","","","","",0,"","","");
  nome: string;
  email: string;
  datanascimento: string;
  cpf: string;
  senha: string;
  repetir_senha: string;
  altura: number;
  sexo: string;
  datacadastro: string;
  status: string;

  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, private usuarioService: UsuarioService) {
  }

  onSubmit() {
    this.datacadastro = new Date().toLocaleDateString('ko-KR');

    let re = /\./gi;
    let r = /\. /gi;
    this.datacadastro = this.datacadastro.replace(r, "-");
    this.datacadastro = this.datacadastro.replace(re, "");

    if(this.verificaSenha()){
      this.novo_usuario.nome = this.nome;
      this.novo_usuario.email = this.email;
      this.novo_usuario.datanascimento = this.datanascimento;
      this.novo_usuario.cpf = this.cpf;
      this.novo_usuario.senha = this.senha;
      this.novo_usuario.altura = this.altura;
      this.novo_usuario.sexo = this.sexo;
      this.novo_usuario.datacadastro = this.datacadastro;
      this.novo_usuario.status = false;
      this.usuarioService.save(this.novo_usuario).subscribe(
        usuario => console.log(usuario),
        erro => console.log(erro));
      this.navCtrl.push(TabsPage);
    }
    else{
      this.showAlert();
    }
  }

  verificaSenha(){
    if(this.senha === this.repetir_senha)
      return true;
    else
      return false;
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Senha não confere',
      subTitle: 'As senhas digitadas não coferem. Por favor verifique os campos',
      buttons: ['OK']
    });
    alert.present();
  }
}
