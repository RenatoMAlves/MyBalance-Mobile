import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { NotificationService } from '../../notification.services';
import { App, MenuController } from 'ionic-angular';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


/**
 * Generated class for the NotificationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {
  notificacoes = { id: null, message: null, dataEnvio: null };
  notifications: Observable<any[]>;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public navParams: NavParams, private platform: Platform, private alert: AlertController, public notificationService: NotificationService, app: App, menu: MenuController) {
    menu.enable(true);
    this.onNotification();
    this.notifications = notificationService.getNotificacoes();
  }

  async onNotification() {
    try {
      await this.platform.ready();
      FCMPlugin.onNotification((data) => {
        if (data.message != null) {
          this.notificacoes.message = data.message;
          this.notificacoes.dataEnvio = data.dtcadastro;
          this.addnotificacoes()
        }
        this.alert.create({
          message: data.message,
          buttons: ['OK']
        }).present();

      }, (error) => console.log(error));
    }
    catch (e) {
      console.error(e);
    }
  }

  addnotificacoes() {
    this.notificacoes.id = Date.now();
    this.notificationService.createNotificacao(this.notificacoes);
  }

  limparNotifications() {
    let confirm = this.alertCtrl.create({
      title: 'Deletar Notificações',
      message: 'Você realmente deseja deletar todas as notificações?',
      buttons: [
        {
          text: 'Não',
          handler: () => {
            console.log('Não deletou');
          }
        },
        {
          text: 'Sim',
          handler: () => {
            this.notificationService.deleteNotifications();;
          }
        }
      ]
    });
    confirm.present();
  }
}
