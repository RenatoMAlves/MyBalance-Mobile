import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { SincronizarBluetoothPage } from '../sincronizar-bluetooth/sincronizar-bluetooth';
import { CadastroPage } from '../cadastro/cadastro';
import { CadastrarPesoPage } from '../cadastrar-peso/cadastrar-peso';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = CadastrarPesoPage;
  tab3Root = CadastroPage;
  tab4Root = SincronizarBluetoothPage;

  constructor() {

  }
}
