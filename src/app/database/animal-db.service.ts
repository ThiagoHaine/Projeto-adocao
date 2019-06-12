import { Injectable } from '@angular/core';
import { Animal, DBFolder } from '../models/animal';
import { Observable,combineLatest  } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DB } from './FireBaseDefault';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class AnimalDbService extends DB{

  constructor(db:AngularFirestore) {
    super(DBFolder,db);
  }

  public adotar(id:string){
    this.atualiza(id,{adotado: true});
  }

  public listar(){
    return this.retorna();
  }

  public doar(pet:Animal):void{
    this.adiciona(pet);
  }
}
