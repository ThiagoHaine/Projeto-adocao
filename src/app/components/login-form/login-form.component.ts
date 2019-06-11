import { Component, OnInit } from '@angular/core';
import { LoginDBService } from '../../database/login-db.service';
import { Login } from '../../models/login';
import { Foto } from '../../models/foto';
import { GlobalService } from '../../global';
import { Md5 } from "md5-typescript";
import { Subscription } from 'rxjs';
import { MessageDbService } from './../../database/message-db.service';
import { FotoDbService } from './../../database/foto-db.service';
import { Message } from './../../models/message';
import { LocalNotifications, ILocalNotification } from '@ionic-native/local-notifications/ngx';

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

  constructor(private db:LoginDBService, private global:GlobalService, private msgDb: MessageDbService, private not:LocalNotifications, private fotoDB: FotoDbService) {
    this.aviso = "";
    if (localStorage.getItem("login")!="" && localStorage.getItem("login")!=undefined){
      this.login=localStorage.getItem("login");
      this.senha=localStorage.getItem("senha");
      this.logar();
    }
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
        localStorage.setItem("login", this.login);
        localStorage.setItem("senha", this.senha);
        this.aviso="Logado com Sucesso!";

        this.global.user=result[0];
        this.global.user.foto=<Foto>{
          login: result[0].login,
          foto: ""
        };
        let fotoscribe:Subscription=this.fotoDB.getFoto(result[0].login).subscribe(foto=>{
          this.global.user.foto=foto[0];
          let datascribe:Subscription=this.db.loginData(result[0]).subscribe(a=>{
            this.global.userid=this.db.getId(a[0]);
            this.global.logado=true;
            datascribe.unsubscribe();
          });
          fotoscribe.unsubscribe();
        });
        this.msgDb.escuta(result[0].login).subscribe(msgs=>{
          let notifications:ILocalNotification[]=[]

          if (msgs.length>0){
            let nid=1;
            msgs.forEach(a=>{
              notifications.push({
                id: nid,
                title: "Nova Mensagem de "+a.from,
                text: ((a.msg.length>20) ? a.msg.substring(0,17)+"..." : a.msg)
              })
              nid++;
            });
            this.not.schedule(notifications);
          }
          this.global.messageCache=msgs;
        });
      }
      this.subscription.unsubscribe();
    });
  }

  ngOnInit() {}

}
