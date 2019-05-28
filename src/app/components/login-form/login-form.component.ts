import { Component, OnInit } from '@angular/core';
import { LoginDBService } from '../../database/login-db.service';
import { Login } from '../../models/login';
import { GlobalService } from '../../global';
import { Md5 } from "md5-typescript";
import { Subscription } from 'rxjs';
import { MessageDbService } from './../../database/message-db.service';
import { Message } from './../../models/message';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {

  private login:string="";
  private senha:string="";
  private aviso:string="";
  private subscription:Subscription;

  constructor(private db:LoginDBService, private global:GlobalService, private msgDb: MessageDbService) {
    this.aviso = "";
  }

  public logar(){
    this.aviso="Aguarde um momento...";
    if (this.login=="" || this.senha==""){
      this.aviso="Preencha todos os campos!";
      return;
    }
    this.subscription=this.db.login(this.login,Md5.init(this.senha)).subscribe(result=>{
      if ((result as Array<Login>).length==0){
        this.aviso="Login ou Senha Incorretos!";
      }else{
        this.aviso="Logado com Sucesso!";
        this.global.user=result[0];
        this.msgDb.escuta(result[0].login).subscribe(msgs=>{
          this.global.messageCache=msgs;
        });
        this.db.loginData(result[0]).subscribe(a=>{
          this.global.userid=this.db.getId(a[0]);
          this.global.logado=true;
        });
      }
      this.subscription.unsubscribe();
    });
  }

  ngOnInit() {}

}
