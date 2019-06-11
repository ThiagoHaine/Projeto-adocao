import { Injectable } from '@angular/core';
import { Foto, DBFolder } from '../models/foto';
import { Observable,combineLatest  } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DB } from './FireBaseDefault';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class FotoDbService extends DB{

  constructor(db:AngularFirestore) {
    super(DBFolder,db);
  }

  public getFoto(login:string):Observable<Foto[]>{
    return this.retorna(a=>a.where("login","==",login));
  }

  public getFotoData(login:string):Observable<Foto[]>{
    return this.retornaAdv(a=>a.where("login","==",login));
  }

  public trocaFoto(id:string,login:string,base64:string):void{
    let foto:Foto;
    foto.login=login;
    foto.foto=base64;
    this.atualiza(id,foto);
  }

  public registraFoto(login:string):void{
    let foto:Foto;
    foto.login=login;
    foto.foto="";
    this.adiciona(foto);
  }

  public removeFoto(id:string,login:string):void{
    let foto:Foto;
    foto.login=login;
    foto.foto="";
    this.atualiza(id,foto);    
  }
}
