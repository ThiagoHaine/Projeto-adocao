import { Injectable } from '@angular/core';
import { Login } from './models/login';
import { MessageDbService } from './database/message-db.service';
import { Message } from './models/message';

@Injectable({
  providedIn: 'root'
})

export class GlobalService{
    public logado:boolean;
    public userid:string;
    public user:Login;
    public cadastrar:boolean;
    public messageCache:Message[]=[];
    public inchat:string="-1";

    constructor(){
        this.logado=false;
        this.cadastrar=false;
        this.userid="";
        this.user = <Login>{};
    }
}
