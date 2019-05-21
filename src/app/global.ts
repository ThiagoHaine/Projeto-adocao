import { Injectable } from '@angular/core';
import { Login } from './models/login';

@Injectable({
  providedIn: 'root'
})

export class GlobalService{
    public logado:boolean;
    public userid:string;
    public user:Login;
    public cadastrar:boolean;

    constructor(){
        this.logado=false;
        this.cadastrar=false;
        this.userid="";
        this.user = <Login>{};
    }
}
