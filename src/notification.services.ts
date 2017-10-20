import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class NotificationService {
    notificacoes: Observable<any[]>;

    constructor(public  afDB: AngularFireDatabase)  { 
       this.notificacoes = afDB.list('notificacoes/mybalance').valueChanges();
    }

    public getNotificacoes(){
        return this.notificacoes;
    }

    public createNotificacao(notificacao){
        this.afDB.database.ref('/notificacoes/mybalance/'+notificacao.id).set(notificacao);            
     }

    public deleteNotifications(){
        this.afDB.database.ref('/notificacoes/mybalance/').remove();        
    }
}