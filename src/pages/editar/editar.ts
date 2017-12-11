import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OnInit } from '@angular/core';
import { UsuarioService } from '../cadastro/usuario.service';
import { Usuario } from '../cadastro/Usuario';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../tabs/tabs';
import { LoginPage } from '../login/login';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Generated class for the EditarPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editar',
  templateUrl: 'editar.html',
})
export class EditarPage {
  usuario: any = new Object();
  id: number;
  email_logado: any;
  formularioEdit: FormGroup;
  submitAttempt: boolean = false;

  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    private storage: Storage,
    public usuarioService: UsuarioService,
    public formBuilder: FormBuilder) {
    this.formularioEdit = formBuilder.group({
      nome: ['', Validators.compose([Validators.pattern('[a-zA-z ]*'), Validators.required])],
      email: ['', Validators.compose([Validators.pattern('[a-zA-z._0-9]*@[a-zA-z]+[.][a-zA-z]{2,3}'), Validators.required])],
      datanascimento: ['', Validators.required],
      senha: ['', Validators.compose([Validators.maxLength(12), Validators.minLength(6), Validators.required])],
      repetir_senha: ['', Validators.compose([Validators.maxLength(12), Validators.minLength(6), Validators.required])],
      altura: [0, Validators.compose([Validators.minLength(3), Validators.maxLength(3), Validators.pattern('[0-9]*'), Validators.required])],
      sexo: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit() {
    this.storage.get('email').then((email) => {
      this.usuarioService.getUsuariosByEmail(email).subscribe((usuario) => {
        this.usuario = usuario[0]
        this.formularioEdit.setValue({
          nome: this.usuario.nome,
          email: this.usuario.email,
          datanascimento: this.usuario.datanascimento,
          senha: this.usuario.senha,
          repetir_senha: this.usuario.senha,
          altura: this.usuario.altura,
          sexo: this.usuario.sexo,
        })
      });
    });

  }

  onSubmit() {
    this.submitAttempt = true;
    if (!this.formularioEdit.valid) {
      let alert = this.alertCtrl.create({
        title: 'Existem informações inválidas',
        subTitle: 'Por favor, verifique os campos inválidos',
        buttons: ['OK']
      });
      alert.present();
    }
    else {
      if(this.verificaSenha()){
        this.usuarioService.update(this.formularioEdit.value, this.usuario.id, this.usuario.datacadastro).subscribe(
          (data) => {
            let alert = this.alertCtrl.create({
              title: 'Dados atualizados',
              subTitle: 'Os dados da conta foram atualizados',
              buttons: ['OK']
            });
            alert.present();
            this.navCtrl.push(TabsPage);
          }
        );
      }
      else{
        this.showAlert();
      }
    }
  }

  exluirConta() {
    let confirm = this.alertCtrl.create({
      title: 'Confirmar Exclusão?',
      message: 'Todos os dados desta conta serão excluídas da nossa base de dados',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
          }
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.usuarioService.delete(this.usuario.id).subscribe((data) => {
              let alert = this.alertCtrl.create({
                title: 'Conta Excluída',
                subTitle: 'Os dados da conta foram removidos da nossa base de dados',
                buttons: ['OK']
              });
              this.storage.remove('email');
              this.storage.remove('senha');
              this.navCtrl.push(LoginPage);
            });
          }
        }
      ]
    });
    confirm.present();
  }

  verificaSenha() {
    if (this.formularioEdit.value.senha === this.formularioEdit.value.repetir_senha)
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
