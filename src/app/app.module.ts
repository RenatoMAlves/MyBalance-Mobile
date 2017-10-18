import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { myBalance } from './app.component';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { HttpModule } from '@angular/http';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CadastroPageModule } from '../pages/cadastro/cadastro.module';
import { SincronizarBluetoothPageModule } from '../pages/sincronizar-bluetooth/sincronizar-bluetooth.module';

@NgModule({
  declarations: [
    myBalance,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(myBalance),
    CadastroPageModule,
    HttpModule,
    SincronizarBluetoothPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    myBalance,
    HomePage,
    TabsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BluetoothSerial,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
