import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { NotificationService } from '../../notification.services';
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
  notificacoes = {id: null, message: null};
  notifications : Observable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform, private alert: AlertController, public notificationService: NotificationService) {
    this.onNotification();
    this.notifications = notificationService.getNotificacoes();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationPage');
  }


  async onNotification() {
    try {
      await this.platform.ready();
      FCMPlugin.onNotification((data) => {
        if(data.message != null){
          this.notificacoes.message = data.message;
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

  addnotificacoes(){
    this.notificacoes.id = Date.now();
    this.notificationService.createNotificacao(this.notificacoes);
  }

  limparNotifications(){
    this.notificationService.deleteNotifications();
  }
}
