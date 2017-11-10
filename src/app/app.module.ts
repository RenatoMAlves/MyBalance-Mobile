import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler, IonicPageModule } from 'ionic-angular';
import { myBalance } from './app.component';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { FCMPlugin } from 'cordova-plugin-fcm/src/android/FCMPlugin';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { NotificationPage } from "../pages/notification/notification";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CadastroPageModule } from '../pages/cadastro/cadastro.module';
import { SincronizarBluetoothPageModule } from '../pages/sincronizar-bluetooth/sincronizar-bluetooth.module';
import { NotificationService } from '../notification.services';


// Fix for "Expression has changed after it was checked. Previous value: container-"
import {enableProdMode} from '@angular/core'
enableProdMode();

// Import angular2-fusioncharts
import { FusionChartsModule } from 'angular2-fusioncharts';

// Import FusionCharts library
import * as FusionCharts from 'fusioncharts';
// Load FusionCharts Charts module
import Charts from "fusioncharts/fusioncharts.charts";
// Load themes
import themes from "fusioncharts/themes/fusioncharts.theme.fint";
import { CadastrarPesoPageModule } from '../pages/cadastrar-peso/cadastrar-peso.module';

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
    NotificationPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(myBalance),
    IonicPageModule.forChild(myBalance),
    CadastroPageModule,
    HttpModule,
    SincronizarBluetoothPageModule,
    AngularFireModule.initializeApp(firebaseConfig),
    FusionChartsModule.forRoot(FusionCharts, Charts, themes),
    AngularFireDatabaseModule,
    CadastrarPesoPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    myBalance,
    HomePage,
    TabsPage,
    NotificationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BluetoothSerial,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NotificationService
  ]
})
export class AppModule {}
