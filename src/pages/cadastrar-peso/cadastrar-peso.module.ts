import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastrarPesoPage } from './cadastrar-peso';

@NgModule({
  declarations: [
    CadastrarPesoPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastrarPesoPage),
  ],
})
export class CadastrarPesoPageModule {}
