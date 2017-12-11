import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OnInit } from '@angular/core';
import { UsuarioService } from '../cadastro/usuario.service';
import { Usuario } from '../cadastro/Usuario';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../tabs/tabs';
import { LoginPage } from '../login/login';

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
  repetir_senha: string;

  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    private storage: Storage,
    public usuarioService: UsuarioService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditarPage');
  }

  ngOnInit(){
    this.storage.get('email').then((email)=>{
      this.usuarioService.getUsuariosByEmail(email).subscribe((usuario)=>{
        this.usuario = usuario[0]
      });
    });
    
  }

  onSubmit(){
    this.usuarioService.update(this.usuario).subscribe(
      (data) =>{
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

  exluirConta(){
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
            this.usuarioService.delete(this.usuario.id).subscribe((data)=>{
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
}
