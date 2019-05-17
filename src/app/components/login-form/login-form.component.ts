import { Component, OnInit } from '@angular/core';
import { LoginDBService } from '../../database/login-db.service';
import { Login } from '../../models/login';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {

  private login:string="";
  private senha:string="";
  private aviso:string="";

  constructor(private db:LoginDBService) {
    this.aviso = "";
  }

  public logar(){
    this.aviso="Aguarde um momento...";
    if (this.login=="" || this.senha==""){
      this.aviso="Preencha todos os campos!";
      return;
    }
    this.db.login(this.login,this.senha).subscribe(result=>{
      if ((result as Array<Login>).length==0){
        this.aviso="Login ou Senha Incorretos!";
      }else{
        this.aviso="Logado com Sucesso!";
      }
    });
  }

  ngOnInit() {}

}
