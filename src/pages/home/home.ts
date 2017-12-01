import { Component } from '@angular/core';
import { NavController, AlertController  } from 'ionic-angular';
import { App, MenuController } from 'ionic-angular';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    options: RequestOptions;
    headers = new Headers();
    private idUser = 5; //Mudar: Deve receber o id do usuario automaticamente.
    private apiUrl = 'http://localhost:3003';
    public users: Array<{}>;
    pesoAtual: any;
    dataSource: any; //Conjunto de dados do grafico
    public pesos: Array<{ idPeso: 0, idusuario: 0, peso: "", datapesagem: "" }>;

    constructor(
        public navCtrl: NavController,
        app: App,
        menu: MenuController,
        public http: Http,
        public alertCtrl: AlertController
    ) {
        menu.enable(true);
        this.headers.append('Content-Type', 'application/json');
        this.options = new RequestOptions({ headers: this.headers });
        //this.atualizarPesos();
    }

    ionViewWillEnter() {
        this.atualizarPesos()
    }

    public atualizarPesos() {
        this.http.get(this.apiUrl + "/pesos?idusuario=" + this.idUser)
            .map(res => res.json())
            .subscribe(data => {
                this.pesos = data;
                this.montarGrafico();
                this.pesoAtual = this.pesos[this.pesos.length - 1].peso; //Pega o ultimo peso registrado.
            });

    }

    public montarGrafico() {
        this.dataSource = {

            "chart": {
                "caption": "Desenvolvimento",
                //"subCaption": "(FY 2012 to FY 2013)",
                "xAxisName": "Período",
                "yAxisName": "Peso",
                "showValues": "0",
                //"numberPrefix": "$",
                "numberSufix": "$",
                "showBorder": "0",
                "showShadow": "0",
                "bgColor": "#ffffff",
                "paletteColors": "#008ee4",
                "showCanvasBorder": "0",
                "showAxisLines": "0",
                "showAlternateHGridColor": "0",
                "divlineAlpha": "100",
                "divlineThickness": "1",
                "divLineIsDashed": "1",
                "divLineDashLen": "1",
                "divLineGapLen": "1",
                "lineThickness": "3",
                "flatScrollBars": "1",
                "scrollheight": "10",
                "numVisiblePlot": "12",
                "showHoverEffect": "1"
            },

            "categories": [
                {
                    "category": []
                }
            ],

            "dataset": [
                {
                    "data": []
                }]
        };


        /* Inserção dinamina no grafico de linha......................... */
        for (let p of this.pesos) {
            this.dataSource.categories[0].category.push({ label: p.datapesagem });
            this.dataSource.dataset[0].data.push({ value: p.peso });
            console.log(p.datapesagem + " - " + p.peso);
        }

    }

    public delPeso(id: any) {
        this.http.delete(this.apiUrl + "/pesos/" + id, this.options).subscribe((ok) => {
            console.log("Successfully Deleted." + ok);
            this.atualizarPesos();
        }, (err) => {
            alert("Oops!, Something went wrong on deletion." + err);
        });
    }

    showConfirmDelPeso(id: any) {
        let confirm = this.alertCtrl.create({
            title: 'Deletar um peso?',
            message: 'Você realmente deseja deletar esse peso?',
            buttons: [
                {
                    text: 'Não',
                    handler: () => {
                        console.log('Não deletou');
                    }
                },
                {
                    text: 'Sim',
                    handler: () => {
                        this.delPeso(id);
                    }
                }
            ]
        });
        confirm.present();
    }

}
