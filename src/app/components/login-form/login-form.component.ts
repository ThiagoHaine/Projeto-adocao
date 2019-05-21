import { Component, OnInit } from '@angular/core';
import { LoginDBService } from '../../database/login-db.service';
import { Login } from '../../models/login';
import { GlobalService } from '../../global';
import { Md5 } from "md5-typescript";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {

  private login:string="";
  private senha:string="";
  private aviso:string="";

  constructor(private db:LoginDBService, private global:GlobalService) {
    this.aviso = "";
  }

  public logar(){
    this.aviso="Aguarde um momento...";
    if (this.login=="" || this.senha==""){
      this.aviso="Preencha todos os campos!";
      return;
    }
    this.db.login(this.login,Md5.init(this.senha)).subscribe(result=>{
      if ((result as Array<Login>).length==0){
        this.aviso="Login ou Senha Incorretos!";
      }else{
        this.aviso="Logado com Sucesso!";
        this.global.user=result[0];
        this.db.loginData(result[0]).subscribe(a=>{
          this.global.userid=this.db.getId(a[0]);
          this.global.logado=true;
        });
      }
    });
  }

  ngOnInit() {}

}
