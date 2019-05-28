import { Component, OnInit } from '@angular/core';
import { MessageDbService } from './../../database/message-db.service';
import { Message,MessageList } from './../../models/message';
import { GlobalService } from '../../global';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss'],
})

export class ChatListComponent implements OnInit {
  private chats:Message[] = []
  private show:MessageList[] = []
  private con:Subscription;

  constructor(private global:GlobalService, private db:MessageDbService) {
  }

  atualizarChat(){
    this.show = []
    this.chats.forEach(a=>{
      let index = this.show.findIndex(x=>x.nome==a.from);
      console.log(index.toString()+" - "+a.from);
      if (index!=-1){
        this.show[index].lastmsg=a.msg;
        if (a.status=="unread"){
          this.show[index].n++;
        }
      }else{
        let nm=0;
        if (a.status=="unread"){
          nm=1;
        }
        this.show.push({
          n:nm,
          nome: a.from,
          lastmsg: a.msg
        });
      }
    });
  }

  abreSalaChat(user){
    this.global.inchat=user;
  }

  ngOnInit() {
    this.con=this.db.escutaGeral(this.global.user.login).subscribe(data=>{
      this.chats = data;
      this.atualizarChat();
    });
  }

  ngOnDestroy(){
    this.con.unsubscribe();
  }

  startChat(){
    let nome=prompt("Qual o nome do usuário?");
    this.global.inchat=nome;
  }
}
