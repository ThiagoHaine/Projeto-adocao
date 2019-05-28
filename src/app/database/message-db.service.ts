import { Injectable } from '@angular/core';
import { Message, DBFolder } from '../models/message';
import { Observable,combineLatest  } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DB } from './FireBaseDefault';
import { AngularFirestore } from 'angularfire2/firestore';


@Injectable({
  providedIn: 'root'
})
export class MessageDbService extends DB {

  constructor(db:AngularFirestore) { 
    super(DBFolder,db);
  }
  public escutaChat(p1:string,p2:string){
    return this.retorna(f=>f.where("from","==",p1).where("to","==",p2));
  }
  public escuta(nome:string):Observable<Message[]>{
    return this.retorna(a=>a.where("to","==",nome).where("status","==","unread"));
  }
  public envia(msg:Message){
    this.adiciona(msg);
  }
  public escutaGeral(nome:string):Observable<Message[]>{
    return this.retorna(a=>a.where("to","==",nome));
  }


}
