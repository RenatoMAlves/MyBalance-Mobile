import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';

@IonicPage()
@Component({
  selector: 'page-cadastrar-peso',
  templateUrl: 'cadastrar-peso.html',
})
export class CadastrarPesoPage {
  
    private url = 'http://localhost:3003';
    private idUser:number = 5;
  
    pesos = {
      idusuario: 5,
      peso: 10,
      datapesagem: "2017-11-03"
    };

  constructor(
                public navCtrl: NavController, 
                public navParams: NavParams,
                public http: Http,
                public alertCtrl: AlertController
  ) {
    console.log(this.pesos);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastrarPesoPage');
  }
  
    savePeso(pesos) {
      console.log("Antes do post: " + JSON.stringify(pesos));
  
      let body = JSON.stringify({"idusuario": pesos.idusuario, "peso": pesos.peso,"datapesagem": pesos.datapesagem});
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
  
      this.http.post(this.url + '/pesos', body, options)
                .map(res => { res.json })
                .subscribe( data =>
                  this.alertaPeso()
                )
    }

    alertaPeso(){
        let alert = this.alertCtrl.create({
          title: 'Sucesso',
          subTitle: 'Peso cadastrado com sucesso.',
          buttons: ['OK']
        });
        alert.present();
    }

}
