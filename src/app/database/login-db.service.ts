import { Injectable } from '@angular/core';
import { Login, DBFolder } from '../models/login';
import { Observable } from 'rxjs';
import { DB } from './FireBaseDefault';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})

export class LoginDBService extends DB{

  constructor(db:AngularFirestore) { 
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
  }
}
