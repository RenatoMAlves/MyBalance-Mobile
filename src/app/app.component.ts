import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { NotificationPage } from "../pages/notification/notification";
import { CadastroPage } from "../pages/cadastro/cadastro";
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class myBalance {
  @ViewChild(Nav) nav: Nav;
  
  //rootPage:any = TabsPage;
  rootPage:any = LoginPage;
  
  pages: Array<{title: string, component: any}>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
    this.pages = [
      { title: 'Home', component: TabsPage },
      { title: 'Notificações', component: NotificationPage },
      { title: 'Cadastro', component: CadastroPage}
    ];
  }
  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
