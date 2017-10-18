import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SincronizarBluetoothPage } from './sincronizar-bluetooth';

@NgModule({
  declarations: [
    SincronizarBluetoothPage,
  ],
  imports: [
    IonicPageModule.forChild(SincronizarBluetoothPage),
  ],
})
export class SincronizarBluetoothPageModule {}
