import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuarioService } from '../cadastro/usuario.service';
import { OnInit } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../tabs/tabs';
import { MenuController } from 'ionic-angular';
import { CadastroPage } from '../cadastro/cadastro';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  email: string = "";
  senha: string = "";

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    public usuarioService: UsuarioService,
    private alertCtrl: AlertController,
    public menu: MenuController) {
  }

  ngOnInit() {
    this.menu.enable(false, '');
    this.storage.get('email').then((email) => {
      this.storage.get('senha').then((senha)=>{
        if(email != null && senha != null)
          this.navCtrl.push(TabsPage)
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  logar(){
    if(this.email == ""){
      let alert = this.alertCtrl.create({
        title: 'Email obrigatório',
        subTitle: 'Por favor, informe o seu email',
        buttons: ['Dismiss']
      });
      alert.present();
    }
    else if(this.senha==""){
      let alert = this.alertCtrl.create({
        title: 'Senha obrigatória',
        subTitle: 'Por favor, insira sua senha senha',
        buttons: ['Dismiss']
      });
      alert.present();
    }
    else {
      this.autenticar();
    }

  }

  autenticar(){
    // Apenas para teste
    // this.navCtrl.push(TabsPage)

    this.usuarioService.getUsuariosByEmail(this.email).subscribe(data => {
      if(data == ""){
        let alert = this.alertCtrl.create({
          title: 'Email não encontrado',
          subTitle: 'Por favor insira o endereço de e-mail informado no momento do cadastro',
          buttons: ['Dismiss']
        });
        alert.present();
      }
      else{
        if(this.verificaCredenciais(data[0].senha)){
          this.salvarSessaoUsuario(data[0].id)
          this.navCtrl.push(TabsPage)
        }
        else{
          console.log(data)
          let alert = this.alertCtrl.create({
            title: 'Credenciais Inválidas',
            subTitle: 'Nome de usuário ou senha incorretos',
            buttons: ['Dismiss']
          });
          alert.present();
        }

      }
    },
    erro => {
      console.log(erro)
    });
  }

  verificaCredenciais(senhaUsuario: any){
    if(senhaUsuario === this.senha)
      return true
    else
      return false
  }

  salvarSessaoUsuario(idUser: any){
    this.storage.set('email', this.email);
    this.storage.set('senha', this.senha);
  }

  redirecionaCadastro(){
    this.navCtrl.push(CadastroPage)
  }
}
