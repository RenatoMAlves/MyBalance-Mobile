import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastroPage } from './cadastro';
import { UsuarioService } from './cadastro.service';

@NgModule({
  declarations: [
    CadastroPage,
  ],
  providers: [
    UsuarioService
  ],
  imports: [
    IonicPageModule.forChild(CadastroPage),
  ],  
})
export class CadastroPageModule {

}
