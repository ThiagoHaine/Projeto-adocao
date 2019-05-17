import { Component, OnInit } from '@angular/core';
import { LoginDBService } from '../../database/login-db.service';
import { Login } from '../../models/login';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {
  private login:string;
  private senha:string;
  private senhaRepeat:string;
  private nome:string;
  private email:string;
  private aviso:string;

  constructor(private db:LoginDBService) {
    this.login="";
    this.senha="";
    this.senhaRepeat="";
    this.nome="";
    this.email="";
    this.aviso="";
  }

  private registra():void{
    if (this.senha!=this.senhaRepeat){
      this.aviso="As senhas não coincidem";
      return;
    }else if (this.login=="" || this.senha=="" || this.nome=="" || this.email==""){
      this.aviso="Preencha todos os campos!";
    }
    this.db.registrar(<Login>{
      nome: this.nome,
      senha: this.senha,
      login: this.login,
      email: this.email
    });
    this.aviso="Registrado com sucesso!";
  }

  ngOnInit() {}

}
