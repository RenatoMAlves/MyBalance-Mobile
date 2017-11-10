import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';

/**
 * Generated class for the CadastrarPesoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

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
                public http: Http
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
                  console.log("Depois do post" + data)
                )
    }

  

}
