import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OnInit } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { App, MenuController } from 'ionic-angular';
/**
 * Generated class for the SincronizarBluetoothPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sincronizar-bluetooth',
  templateUrl: 'sincronizar-bluetooth.html',
})
export class SincronizarBluetoothPage implements OnInit {
  public habilitado: boolean = false;
  public resultado_bluetooth: any;
  public dispositivos_disponiveis: any[] = [];
  public dispositivos_pareados: any[] = [];
  public status = false;


  constructor(public navCtrl: NavController, public navParams: NavParams, public bluetoothSerial: BluetoothSerial,app: App, menu: MenuController) {
    menu.enable(true);
  }

  ngOnInit() {
    this.verificaHabilitado();
  }

  verificaHabilitado(){
    this.dispositivos_pareados = [];
    this.dispositivos_disponiveis = [];

    this.bluetoothSerial.isEnabled().then((data)=>{
        this.habilitado = true;
        this.listarPareados();
        this.listarDispositivosDisponíveis();
      },
      (erro)=>{
        this.habilitado = false;
        // console.log(erro);
        this.bluetoothSerial.enable().then(
          (data)=>{
            this.dispositivos_pareados = [];
            this.dispositivos_disponiveis = [];
            this.habilitado = true;
            this.listarPareados();
            this.listarDispositivosDisponíveis();
          },
          (error)=>{
            console.log(error);
          }
        );
      }
    );
  }

  listarDispositivosDisponíveis(){
    this.dispositivos_disponiveis = [];
    this.bluetoothSerial.discoverUnpaired().then((data)=>{
        this.status = true;
        this.dispositivos_disponiveis = data;
      },
      (error)=>{
        console.log(error);
      }
    );
  }

  listarPareados(){
    this.bluetoothSerial.list().then((data)=>{
      this.dispositivos_pareados = data;
    },
    (erro)=>{
      console.log(erro);
    });
  }

  conectar(dispositivo: any){
    this.bluetoothSerial.connect(dispositivo.id).subscribe((data)=>{
      console.log(data);
      this.doRefresh(onclick);
    },
    (erro)=>{
      console.log(erro);
    });
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.verificaHabilitado();

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

}
