import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { SincronizarBluetoothPage } from '../sincronizar-bluetooth/sincronizar-bluetooth';
import { CadastroPage } from '../cadastro/cadastro';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = CadastroPage;
  // tab3Root = ContactPage;
  tab4Root = SincronizarBluetoothPage;

  constructor() {

  }
}
