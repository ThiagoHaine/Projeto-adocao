import { Injectable } from '@angular/core';
import { Login, DBFolder } from '../models/login';
import { Observable } from 'rxjs';
import { DB } from './FireBaseDefault';
import { AngularFirestore } from 'angularfire2/firestore';
import { FotoDbService } from './foto-db.service';

@Injectable({
  providedIn: 'root'
})

export class LoginDBService extends DB{
  private foto:FotoDbService;

  constructor(db:AngularFirestore,foto:FotoDbService) { 
    super(DBFolder,db);
  }

  public login(login:string, senha:string):Observable<Login[]>
  {
    return this.retorna(i => i.where('login','==',login).where('senha','==',senha));
  }

  public loginData(login:Login):Observable<Login[]>{
    return this.retornaAdv(i => i.where('login','==',login.login).where('senha','==',login.senha));
  }
  public registrar(user:Login):void{
    this.adiciona(user);
    this.foto.registraFoto(user.login);
  }
}
