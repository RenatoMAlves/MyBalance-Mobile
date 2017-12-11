import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Usuario } from "./Usuario";
import { OnInit } from '@angular/core';
import { TabsPage } from '../tabs/tabs';
import { AlertController } from 'ionic-angular';
import { UsuarioService } from './usuario.service';
import { App, MenuController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  novo_usuario: any = new Usuario("", "", "", "", "", 0, "", "", "");
  datacadastro: string;
  formularioCad: FormGroup;
  submitAttempt: boolean = false;

  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams,
    private usuarioService: UsuarioService, app: App, menu: MenuController, public formBuilder: FormBuilder) {
    menu.enable(false);
    this.formularioCad = formBuilder.group({
      nome: ['', Validators.compose([Validators.pattern('[a-zA-z ]*'), Validators.required])],
      email: ['', Validators.compose([Validators.pattern('[a-zA-z._0-9]*@[a-zA-z]+[.][a-zA-z]{2,3}'), Validators.required])],
      datanascimento: ['', Validators.required],
      senha: ['', Validators.compose([Validators.maxLength(12), Validators.minLength(6), Validators.required])],
      repetir_senha: ['', Validators.compose([Validators.maxLength(12), Validators.minLength(6), Validators.required])],
      altura: [0, Validators.compose([Validators.minLength(3), Validators.maxLength(3), Validators.pattern('[0-9]*'), Validators.required])],
      sexo: ['', Validators.compose([Validators.required])],
    });
  }

  onSubmit() {
    this.submitAttempt = true;
    if (!this.formularioCad.valid) {
      let alert = this.alertCtrl.create({
        title: 'Existem informações inválidas',
        subTitle: 'Por favor, verifique os campos inválidos',
        buttons: ['OK']
      });
      alert.present();
    }
    else {
      this.datacadastro = new Date().toLocaleDateString('ko-KR');

      let re = /\./gi;
      let r = /\. /gi;
      this.datacadastro = this.datacadastro.replace(r, "-");
      this.datacadastro = this.datacadastro.replace(re, "");

      if (this.verificaSenha()) {
        console.log('teste');
        this.usuarioService.getUsuariosByEmail(this.formularioCad.value.email).subscribe((data) => {
          if (data.length == 0)
            this.salvar()
          else {
            let alert = this.alertCtrl.create({
              title: 'Já existe uma conta vinculada a este email',
              subTitle: 'Por favor, utilize outro email para criar a conta',
              buttons: ['OK']
            });
            alert.present();
          }
        },
        (erro) => {
          let alert = this.alertCtrl.create({
            title: 'ERRO',
            subTitle: erro,
            buttons: ['OK']
          });
          alert.present();
        });
      }
      else {
        this.showAlert();
      }
    }
  }

  salvar() {
    this.usuarioService.save(this.formularioCad.value, this.datacadastro).subscribe(
      usuario => {
        console.log(usuario)
        let alert = this.alertCtrl.create({
          title: 'Conta criada com sucesso',
          subTitle: '',
          buttons: ['OK']
        });
        alert.present();
        this.navCtrl.push(LoginPage);
      },
      erro => console.log(erro)
    );
  }

  verificaSenha() {
    if (this.formularioCad.value.senha === this.formularioCad.value.repetir_senha)
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
