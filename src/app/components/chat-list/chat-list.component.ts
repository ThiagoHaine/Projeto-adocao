import { Component, OnInit } from '@angular/core';
import { MessageDbService } from './../../database/message-db.service';
import { Message,MessageList } from './../../models/message';
import { GlobalService } from '../../global';
import { Observable, Subscription } from 'rxjs';
import { FotoDbService } from './../../database/foto-db.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss'],
})

export class ChatListComponent implements OnInit {
  private chats:Message[] = []
  private msgsFrom:Message[] = []
  private msgsTo:Message[] = []
  private show:MessageList[] = []
  private subscribes:Subscription[]=[];

  constructor(private global:GlobalService, private db:MessageDbService, private fotoDB: FotoDbService) {
  }

  atualizarChat(){
    this.show = []
    this.chats.forEach(a=>{
      let index = this.show.findIndex(x=>x.nome==a.from || x.nome==a.to);
      if (index!=-1){
        this.show[index].lastmsg=a.msg;
        if (a.status=="unread" && a.from!=this.global.user.login){
          this.show[index].n++;
        }
      }else{
        let nm=0;
        if (a.status=="unread" && a.from!=this.global.user.login){
          nm=1;
        }
        this.show.push({
          n:nm,
          nome: ((a.from==this.global.user.login) ? a.to : a.from),
          lastmsg: a.msg,
          foto: {
            login: ((a.from==this.global.user.login) ? a.to : a.from),
            foto: ""
          }
        });
        let subs:Subscription=this.fotoDB.getFoto(((a.from==this.global.user.login) ? a.to : a.from)).subscribe(data=>{
          if (data.length>0){
            let index=this.show.findIndex(a=>a.nome==data[0].login);
            this.show[index].foto=data[0];
          }
          subs.unsubscribe();
        });
      }
    });
  }

  abreSalaChat(user){
    this.global.inchat=user;
  }

  ngOnInit() {
    this.subscribes[0]=this.db.escutaGeral(this.global.user.login,"from").subscribe(data=>{
      this.msgsFrom=data;
      this.concatMessages();
    });
    this.subscribes[1]=this.db.escutaGeral(this.global.user.login,"to").subscribe(data=>{
      this.msgsTo=data;
      this.concatMessages();
    });
  }

  bubbleSort(arr:Message[]):Message[]{
    let swapped;
    do {
      swapped = false;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i+1]!=undefined){
          if (arr[i].ordem>arr[i+1].ordem) {
            let tmp = arr[i];
            arr[i] = arr[i + 1];
            arr[i + 1] = tmp;
            swapped = true;
          }
        }
      }
    } while (swapped);
    return arr;
  };

  concatMessages(){
    this.chats = this.msgsFrom.concat(this.msgsTo);
    if (this.chats.length>1){
      this.chats=this.bubbleSort(this.chats);
    }
    this.atualizarChat();
  }

  ngOnDestroy(){
    this.subscribes.forEach(a=>{
      a.unsubscribe();
    });
  }

  startChat(){
    let nome=prompt("Qual o nome do usuário?");
    this.global.inchat=nome;
  }
}
