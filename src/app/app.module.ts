import { IonicStorageModule } from '@ionic/storage';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler, IonicPageModule } from 'ionic-angular';
import { myBalance } from './app.component';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { NotificationPage } from "../pages/notification/notification";
import { LoginPage } from "../pages/login/login";


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NotificationService } from '../notification.services';
import { CadastroPage } from '../pages/cadastro/cadastro'; 
import { EditarPage } from '../pages/editar/editar'; 
import { UsuarioService } from '../pages/cadastro/usuario.service'; 
import { SincronizarBluetoothPage } from '../pages/sincronizar-bluetooth/sincronizar-bluetooth'; 

export const firebaseConfig = {
  apiKey: "AIzaSyDS8_GafE0BIEhI5n6J8imYskvV8mKglEs",
  authDomain: "fir-mybalance.firebaseapp.com",
  databaseURL: "https://fir-mybalance.firebaseio.com",
  storageBucket: "firebase-mybalance.appspot.com",
  messagingSenderId: '52669270901'
};

@NgModule({
  declarations: [
    myBalance,
    HomePage,
    TabsPage,
    LoginPage,
    EditarPage,
    SincronizarBluetoothPage,
    CadastroPage,
    NotificationPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(myBalance),
    IonicPageModule.forChild(myBalance),
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    myBalance,
    HomePage,
    LoginPage,
    EditarPage,
    SincronizarBluetoothPage,
    CadastroPage,
    TabsPage,
    NotificationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BluetoothSerial,
    UsuarioService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NotificationService,
  ]
})
export class AppModule {}
